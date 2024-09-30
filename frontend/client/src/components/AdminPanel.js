import React, { useState } from 'react';
import './Admin.css';

const AdminPanel = () => {
    const [showManageCourses, setShowManageCourses] = useState(false);
    const [showManageUsers, setShowManageUsers] = useState(false);
    const [showReports, setShowReports] = useState(false);

    const toggleManageCourses = () => setShowManageCourses(!showManageCourses);
    const toggleManageUsers = () => setShowManageUsers(!showManageUsers);
    const toggleReports = () => setShowReports(!showReports);

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
                    <ul>
                        <li>Edit or Delete Existing Courses</li>
                        <li>Add New Courses</li>
                        <li>View Course Enrollments</li>
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
                        <li>View All Users</li>
                        <li>Update User Roles (Admin/Student)</li>
                        <li>Delete or Suspend Accounts</li>
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
                        <li>Course Completion Reports</li>
                        <li>Platform Usage Analytics</li>
                        <li>Generate Custom Reports</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
