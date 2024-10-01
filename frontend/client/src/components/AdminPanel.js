import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminPanel = () => {
    const [showManageCourses, setShowManageCourses] = useState(false);
    const [showManageUsers, setShowManageUsers] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState([]);
    const [newCourse, setNewCourse] = useState({ name: '', description: '', enrollmentCount: 0 });
    const [roleUpdate, setRoleUpdate] = useState({ userId: '', role: '' });

    // Toggle state functions
    const toggleManageCourses = () => setShowManageCourses(!showManageCourses);
    const toggleManageUsers = () => setShowManageUsers(!showManageUsers);
    const toggleReports = () => setShowReports(!showReports);

    // Fetch Courses from backend
    useEffect(() => {
        if (showManageCourses) {
            axios.get('/api/admin/courses')
                .then((response) => {
                    setCourses(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the courses!", error);
                });
        }
    }, [showManageCourses]);

    // Fetch Users from backend
    useEffect(() => {
        if (showManageUsers) {
            axios.get('/api/admin/users')
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the users!", error);
                });
        }
    }, [showManageUsers]);

    // Fetch Reports from backend
    useEffect(() => {
        if (showReports) {
            axios.get('/api/admin/reports')
                .then((response) => {
                    setReports(response.data);
                })
                .catch((error) => {
                    console.error("There was an error fetching the reports!", error);
                });
        }
    }, [showReports]);

    // Handle adding a new course
    const handleAddCourse = () => {
        axios.post('/api/admin/courses', newCourse)
            .then((response) => {
                setCourses([...courses, response.data.course]);
                setNewCourse({ name: '', description: '', enrollmentCount: 0 }); // Reset form
            })
            .catch((error) => {
                console.error("There was an error adding the course!", error);
            });
    };

    // Handle updating user role
    const handleUpdateUserRole = (userId) => {
        axios.patch(`/api/admin/users/${userId}`, { role: roleUpdate.role })
            .then((response) => {
                setUsers(users.map(user => user._id === userId ? response.data.user : user));
                setRoleUpdate({ userId: '', role: '' }); // Reset form
            })
            .catch((error) => {
                console.error("There was an error updating the user role!", error);
            });
    };

    // Handle deleting a course
    const handleDeleteCourse = (courseId) => {
        axios.delete(`/api/admin/courses/${courseId}`)
            .then(() => {
                setCourses(courses.filter(course => course._id !== courseId));
            })
            .catch((error) => {
                console.error("There was an error deleting the course!", error);
            });
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <p>Welcome, Admin! Use the tools below to manage the platform.</p>
            
            {/* Manage Courses Section */}
            <button onClick={toggleManageCourses}>
                {showManageCourses ? 'Hide' : 'Manage'} Courses
            </button>
            {showManageCourses && (
                <div className="admin-section">
                    <h2>Manage Courses</h2>
                    <input 
                        type="text" 
                        placeholder="Course Name" 
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    />
                    <input 
                        type="text" 
                        placeholder="Description" 
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    />
                    <input 
                        type="number" 
                        placeholder="Enrollment Count" 
                        value={newCourse.enrollmentCount}
                        onChange={(e) => setNewCourse({ ...newCourse, enrollmentCount: e.target.value })}
                    />
                    <button onClick={handleAddCourse}>Add Course</button>
                    <ul>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <li key={course._id}>
                                    {course.name}
                                    <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
                                </li>
                            ))
                        ) : (
                            <li>No courses available.</li>
                        )}
                    </ul>
                </div>
            )}
            
            {/* Manage Users Section */}
            <button onClick={toggleManageUsers}>
                {showManageUsers ? 'Hide' : 'Manage'} Users
            </button>
            {showManageUsers && (
                <div className="admin-section">
                    <h2>Manage Users</h2>
                    <ul>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <li key={user._id}>
                                    {user.username} 
                                    <select 
                                        value={roleUpdate.userId === user._id ? roleUpdate.role : user.role} 
                                        onChange={(e) => setRoleUpdate({ userId: user._id, role: e.target.value })}
                                        onBlur={() => handleUpdateUserRole(user._id)}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                        {/* Add other roles if needed */}
                                    </select>
                                </li>
                            ))
                        ) : (
                            <li>No users available.</li>
                        )}
                    </ul>
                </div>
            )}
            
            {/* View Reports Section */}
            <button onClick={toggleReports}>
                {showReports ? 'Hide' : 'View'} Reports
            </button>
            {showReports && (
                <div className="admin-section">
                    <h2>Reports & Analytics</h2>
                    <ul>
                        {reports.length > 0 ? (
                            reports.map((report, index) => (
                                <li key={index}>{report.name}</li>
                            ))
                        ) : (
                            <li>No reports available.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
