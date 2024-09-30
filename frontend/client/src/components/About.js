// About.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './About.css';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const About = () => {
    const data = {
        labels: ['Blockchain Technology', 'Cryptocurrency', 'Smart Contracts', 'Decentralized Finance', 'NFTs'],
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

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="about-container">
            <header className="about-header">
                <h1>About Blockchain Club</h1>
                <p>We are a community dedicated to exploring the world of blockchain technology and its applications.</p>
            </header>
            <section className="about-content">
                <h2>Our Mission</h2>
                <p>
                    Our mission is to educate, connect, and empower individuals interested in blockchain technology.
                    We host workshops, webinars, and discussions to share knowledge and foster innovation in this exciting field.
                </p>
            </section>
            <section className="charts-section">
                <h2>Trends in Blockchain Technology</h2>
                <div className="chart-container">
                    <Bar data={data} options={options} />
                </div>
            </section>
        </div>
    );
};

export default About;
