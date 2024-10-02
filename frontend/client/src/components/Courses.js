import React, { useState, useEffect } from 'react';
import './Courses.css';

const Courses = () => {
    const [showTutorial, setShowTutorial] = useState(false);
    const [uploadedVideo, setUploadedVideo] = useState(null);
    const [tradeSignal, setTradeSignal] = useState(false);
    const [cryptoSymbol, setCryptoSymbol] = useState('BTC'); // Default to Bitcoin
    const [showTradingView, setShowTradingView] = useState(false);
    
    // New state for trade details
    const [openPosition, setOpenPosition] = useState(null);
    const [targetPosition, setTargetPosition] = useState(null);
    const [tradeAmount, setTradeAmount] = useState(null);
    const [tradeHistory, setTradeHistory] = useState([]);

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
            const newOpenPosition = 50000; // Example value
            const newTargetPosition = 52000; // Example value
            const newTradeAmount = 100; // Example value in USDT

            // Update state with new trade details
            setOpenPosition(newOpenPosition);
            setTargetPosition(newTargetPosition);
            setTradeAmount(newTradeAmount);

            // Add to trade history
            const newTrade = {
                symbol: cryptoSymbol,
                openPosition: newOpenPosition,
                targetPosition: newTargetPosition,
                tradeAmount: newTradeAmount,
                date: new Date().toLocaleString(),
            };
            setTradeHistory([newTrade, ...tradeHistory]);

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
                        style={{ width: "100%", height: "500px", position: 'relative' }}
                    >
                        <div id="tradingview-chart"></div>

                        {/* Buttons for trading platforms */}
                        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                            <a 
                                href="https://www.angelone.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ 
                                    display: 'inline-block', 
                                    padding: '5px 10px', 
                                    margin: '5px', 
                                    backgroundColor: '#4CAF50', 
                                    color: 'white', 
                                    textDecoration: 'none', 
                                    fontSize: '10px',
                                    borderRadius: '5px'
                                }}
                            >
                                AngleOne
                            </a>
                            <a 
                                href="https://zerodha.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ 
                                    display: 'inline-block', 
                                    padding: '5px 10px', 
                                    margin: '5px', 
                                    backgroundColor: '#FF5722', 
                                    color: 'white', 
                                    textDecoration: 'none', 
                                    fontSize: '10px',
                                    borderRadius: '5px'
                                }}
                            >
                                Zerodha
                            </a>
                            <a 
                                href="https://bingx.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ 
                                    display: 'inline-block', 
                                    padding: '5px 10px', 
                                    margin: '5px', 
                                    backgroundColor: '#FFD700', 
                                    color: 'white', 
                                    textDecoration: 'none', 
                                    fontSize: '10px',
                                    borderRadius: '5px'
                                }}
                            >
                                BingX
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Open Position, Target Position, and Trade Amount */}
            {openPosition && targetPosition && tradeAmount && (
                <div style={{ position: 'fixed', bottom: '10px', right: '10px', backgroundColor: 'lightyellow', padding: '5px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h4>Trade Details</h4>
                    <p><strong>Open Position:</strong> {openPosition} USDT</p>
                    <p><strong>Target Position:</strong> {targetPosition} USDT</p>
                    <p><strong>Trade Amount:</strong> {tradeAmount} USDT</p>

                    {/* Trade History */}
                    {tradeHistory.length > 0 && (
                        <div>
                            <h4>Trade History</h4>
                            <ul>
                                {tradeHistory.map((trade, index) => (
                                    <li key={index}>
                                        <p><strong>Symbol:</strong> {trade.symbol}</p>
                                        <p><strong>Open Position:</strong> {trade.openPosition} USDT</p>
                                        <p><strong>Target Position:</strong> {trade.targetPosition} USDT</p>
                                        <p><strong>Amount:</strong> {trade.tradeAmount} USDT</p>
                                        <p><strong>Date:</strong> {trade.date}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Courses;
