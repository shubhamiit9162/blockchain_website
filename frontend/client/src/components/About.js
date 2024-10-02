import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from 'chart.js';
import './About.css';

// Register the required components for both bar and line charts
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const About = () => {
    // Data for the bar chart
    const barData = {
        labels: ['Blockchain Technology', 'Cryptocurrency', 'Smart Contracts', 'DeFi', 'NFTs'],
        datasets: [
            {
                label: 'Trends in 2024',
                data: [65, 59, 80, 81, 56],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Data for the line chart
    const lineData = {
        labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
        datasets: [
            {
                label: 'Blockchain Club Growth',
                data: [100, 200, 400, 600, 1000, 1500],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.4,
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="about-container">
            {/* Header Section */}
            <header className="about-header">
                <h1>About Blockchain Club</h1>
                <p>We are a community dedicated to exploring the world of blockchain technology and its applications.</p>
            </header>

            {/* Left Section */}
            <div className="left-section">
                <h2>Blockchain Club Features</h2>
                <ul>
                    <li>Exclusive workshops on blockchain development</li>
                    <li>Member badges for active participation</li>
                    <li>Blockchain hackathons and competitions</li>
                    <li>Personalized learning paths for beginners to advanced users</li>
                    <li>Access to exclusive industry insights and trends</li>
                </ul>
                <button className="explore-button" onClick={() => window.location.href = '/resources'}>
                    Explore Resources
                </button>
            </div>

            {/* Middle Content */}
            <section className="about-content">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to educate, connect, and empower individuals interested in blockchain technology.
                    We host workshops, webinars, and discussions to share knowledge and foster innovation in this exciting field.
                </p>
            </section>

            {/* Right Section */}
            <div className="right-section">
                <h2>Join Us</h2>
                <p>Become a part of our growing community and start your blockchain journey today.</p>
                <button className="join-button" onClick={() => window.location.href = '/JoinUs'}>
                    Join Now
                </button>

                <h2>Upcoming Events</h2>
                <p>Check out our upcoming webinars, hackathons, and networking events.</p>
                <button className="events-button" onClick={() => window.location.href = '/Dashboard'}>
                    View Events
                </button>
            </div>

            {/* Bar and Line Charts Section */}
            <section className="charts-section">
                <h2>Trends in Blockchain Technology</h2>
                <div className="chart-container">
                    <Bar data={barData} options={chartOptions} />
                </div>

                <h2>Blockchain Club Growth Over the Years</h2>
                <div className="chart-container">
                    <Line data={lineData} options={chartOptions} />
                </div>
            </section>
        </div>
    );
};

export default About;
