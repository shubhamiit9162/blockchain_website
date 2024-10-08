// Home.js
import React from 'react';
import Navbar from './Navbar';
import './Home.css';
import WalletConnection from './WalletConnection';
import Footer from './Footer';

const Home = () => {
    return (
        <div className="page-container"> {/* Add the border container */}
            <Navbar />
            <header className="hero">
                <h1>Welcome to the Blockchain Club</h1>
                <p>Your hub for all things blockchain!</p>
            </header>
            <WalletConnection />
            <section className="upcoming-events">
                <h2>Upcoming Events</h2>
                <ul>
                    <li>Blockchain 101 Workshop - October 5, 2024</li>
                    <li>Smart Contracts Deep Dive - October 12, 2024</li>
                </ul>
            </section>
            <section className="latest-news">
                <h2>Latest News & Blog</h2>
                <ul>
                    <li><a href="#">Understanding Blockchain Technology</a></li>
                    <li><a href="#">The Future of Smart Contracts</a></li>
                    <li><a href="#">Trends in Cryptocurrency</a></li>
                </ul>
            </section>
            <Footer />
        </div>
    );
};

export default Home;
