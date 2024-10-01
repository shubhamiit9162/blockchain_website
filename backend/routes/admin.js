const express = require('express');
const router = express.Router();

const Course = require('../models/Course');
const User = require('../models/User');
const Report = require('../models/Report');

// Fetch all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        if (!courses.length) {
            return res.status(404).json({ message: 'No courses found' });
        }
        res.status(200).json(courses);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching courses");
    }
});

// Create a new course
router.post('/courses', async (req, res) => {
    const { name, description, enrollmentCount } = req.body;

    // Validate input
    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    try {
        const newCourse = new Course({ name, description, enrollmentCount });
        await newCourse.save();
        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error creating course");
    }
});

// Delete a course by ID
router.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error deleting course");
    }
});

// Fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching users");
    }
});

// Fetch all reports
router.get('/reports', async (req, res) => {
    try {
        const reports = await Report.find();
        if (!reports.length) {
            return res.status(404).json({ message: 'No reports found' });
        }
        res.status(200).json(reports);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Error fetching reports");
    }
});

module.exports = router;
