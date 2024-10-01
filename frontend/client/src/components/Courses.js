import React, { useState, useEffect } from 'react';
import './Courses.css';

const Courses = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [tradeSignal, setTradeSignal] = useState(false);
    const [cryptoSymbol, setCryptoSymbol] = useState('BTC'); // Default to Bitcoin
    const [showTradingView, setShowTradingView] = useState(false);

    const toggleTutorial = () => {
        setShowTutorial(!showTutorial);
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        setUploadedVideo(URL.createObjectURL(file)); // Temporarily display the uploaded video
    };

    const sendTradeSignal = () => {
        setTradeSignal(true);
        setTimeout(() => {
            alert("Trade Signal: It's time to take action! Execute your trade now.");
            setShowTradingView(true); // Show TradingView chart after trade signal
            setTradeSignal(false);
        }, 2000); // Simulate a delay before the signal is shown
    };

    // Function to load TradingView widget
    const loadTradingView = () => {
        const script = document.createElement('script');
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = () => {
            new window.TradingView.widget({
                "width": 980,
                "height": 610,
                "symbol": `BINANCE:${cryptoSymbol}USDT`,
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "light",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "allow_symbol_change": true,
                "container_id": "tradingview-chart"
            });
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (showTradingView) {
            loadTradingView();
        }
    }, [showTradingView]);

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

            {/* TradingView Widget */}
            {showTradingView && (
                <div>
                    <h3>TradingView Chart</h3>
                    <div
                        className="tradingview-widget-container"
                        style={{ width: "100%", height: "500px" }}
                    >
                        <div id="tradingview-chart"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;
