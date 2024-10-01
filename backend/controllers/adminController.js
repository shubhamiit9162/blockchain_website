const Course = require('../models/Course');
const User = require('../models/Admin');

// Manage Courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.status(200).json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error, unable to fetch courses' });
    }
};

exports.createCourse = async (req, res) => {
    const { name, description, enrollmentCount } = req.body;
    
    // Validate input
    if (!name || !description || enrollmentCount === undefined) {
        return res.status(400).json({ message: 'Name, description, and enrollment count are required' });
    }

    try {
        const newCourse = new Course({ name, description, enrollmentCount });
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error creating course' });
    }
};

exports.deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error deleting course' });
    }
};

// Manage Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error, unable to fetch users' });
    }
};

exports.updateUserRole = async (req, res) => {
    const { id, role } = req.body;

    // Validate input
    if (!id || !role) {
        return res.status(400).json({ message: 'User ID and role are required' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error updating user role' });
    }
};

// Reports
exports.getReports = async (req, res) => {
    try {
        const courses = await Course.find();
        const users = await User.find();
        
        const report = {
            totalCourses: courses.length,
            totalUsers: users.length,
            courses: courses.map(course => ({
                id: course._id,
                name: course.name,  // Updated to use 'name'
                description: course.description,
                enrollmentCount: course.enrollmentCount
            })),
            users: users.map(user => ({
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email
            }))
        };
        
        res.status(200).json(report);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error generating report' });
    }
};
