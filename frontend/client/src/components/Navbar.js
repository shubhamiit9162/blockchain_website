// Navbar component
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importing CSS for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Blockchain Club</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/admin">Admin Panel</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
