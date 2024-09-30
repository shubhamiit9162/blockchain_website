// Courses.js
import React, { useState } from 'react';
import './Courses.css';


const Courses = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [tradeSignal, setTradeSignal] = useState(false);

    const toggleTutorial = () => {
        setShowTutorial(!showTutorial);
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        setUploadedVideo(URL.createObjectURL(file)); // Temporarily display the uploaded video
    };

    const sendTradeSignal = () => {
        setTradeSignal(true);
        // You can integrate with WebSocket or API here for real-time signals
        setTimeout(() => {
            alert("Trade Signal: It's time to take action! Execute your trade now.");
            setTradeSignal(false);
        }, 2000); // Simulate a delay before the signal is shown
    };

    return (
        <div>
            <h1>Blockchain Education</h1>
            <h2>Courses</h2>
            <ul>
                <li>What is Blockchain?</li>
                <li>Smart Contracts</li>
                <li>Decentralized Applications (DApps)</li>
                <li>Blockchain Security</li>
                <li>Cryptography and Blockchain</li>
            </ul>

            <h3>Interactive Tutorials</h3>
            <button onClick={toggleTutorial}>
                {showTutorial ? 'Hide' : 'Show'} "What is Blockchain?" Tutorial
            </button>
            {showTutorial && (
                <div className="tutorial-content">
                    <h4>What is Blockchain?</h4>
                    <p>
                        Blockchain is a distributed database or ledger that is shared among nodes in a computer network. As a database, blockchain stores information electronically in digital format...
                    </p>
                    <p>
                        Interactive Task: Verify a transaction using a simulated blockchain!
                    </p>
                    <button>Start Interactive Task</button>
                </div>
            )}

            <h3>Video Upload</h3>
            <p>Upload your blockchain tutorial videos to share with the community:</p>
            <input type="file" accept="video/*" onChange={handleVideoUpload} />
            {uploadedVideo && (
                <div>
                    <h4>Uploaded Video:</h4>
                    <video width="500" controls>
                        <source src={uploadedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            <h3>Imaginative Content</h3>
            <p>
                Imagine you're building your first decentralized application (DApp) using a smart contract. You can create a virtual marketplace, set up transactions, and even deploy your own cryptocurrency.
            </p>
            <p>
                To simulate this, imagine the process visually: a buyer requests an item, the smart contract automatically triggers when the conditions are met, and the buyer gets the item while the seller receives the payment.
            </p>
            <button>Start Your Virtual Marketplace Simulation</button>

            <h3>Trade Signals</h3>
            <p>
                Blockchain technology isn't just for development—it's also heavily used in finance and trading. Here's your real-time trade signal based on market data:
            </p>
            <button onClick={sendTradeSignal} disabled={tradeSignal}>
                {tradeSignal ? 'Trade Signal Sent!' : 'Get Trade Signal'}
            </button>
        </div>
    );
};

export default Courses;
