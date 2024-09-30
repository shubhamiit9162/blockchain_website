import React, { useEffect, useState } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import CryptoTracker from './CryptoTracker'; // Import CryptoTracker
import './WalletConnection.css'; // Import the CSS file


const WalletConnection = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [showTracker, setShowTracker] = useState(false); // State to toggle tracker visibility
    const connection = new Connection(clusterApiUrl('devnet'));

    const connectWallet = async () => {
        const { solana } = window;

        if (solana && solana.isPhantom) {
            const response = await solana.connect();
            setWalletAddress(response.publicKey.toString());
        } else {
            alert('Phantom wallet not found! Please install it.');
        }
    };

    const disconnectWallet = () => {
        setWalletAddress(null);
    };

    useEffect(() => {
        if (walletAddress) {
            console.log(`Connected to wallet: ${walletAddress}`);
        }
    }, [walletAddress]);

    const toggleCryptoTracker = () => {
        setShowTracker(!showTracker); // Toggle the visibility of the tracker
    };

    return (
        <div className="wallet-connection">
            <div className="wallet-info">
                {walletAddress ? (
                    <>
                        <p className="wallet-address">Connected: {walletAddress}</p>
                        <button className="disconnect-button" onClick={disconnectWallet}>Disconnect</button>
                    </>
                ) : (
                    <button className="connect-button" onClick={connectWallet}>Connect to Phantom Wallet</button>
                )}
            </div>
            <button className="crypto-tracker-button" onClick={toggleCryptoTracker}>
                Crypto Tracker
            </button>

            {showTracker && <CryptoTracker />} {/* Conditionally render the CryptoTracker */}
        </div>
    );
};

export default WalletConnection;
