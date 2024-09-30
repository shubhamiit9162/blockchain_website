import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './CryptoTracker.css';
import CryptoLineChart from './Chart'; // Import the CSS file

const CryptoTracker = () => {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [cryptoData, setCryptoData] = useState(null);
    const [priceHistory, setPriceHistory] = useState([]);

    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 10,
                        page: 1,
                        sparkline: false,
                    },
                });
                setCryptos(response.data);
            } catch (error) {
                console.error('Error fetching cryptocurrencies:', error);
            }
        };

        fetchCryptos();
    }, []);

    const handleCryptoSelect = async (cryptoId) => {
        try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}`);
            setSelectedCrypto(response.data);

            const historyResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '7', // Fetch data for the last 7 days
                    interval: 'hourly',
                },
            });

            const prices = historyResponse.data.prices.map(price => ({
                x: new Date(price[0]),
                y: price[1],
            }));

            setPriceHistory(prices);
        } catch (error) {
            console.error('Error fetching crypto details:', error);
        }
    };

    const chartData = {
        datasets: [
            {
                label: 'Price (USD)',
                data: priceHistory,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="crypto-tracker">
            <h2>Crypto Tracker</h2>
            <div className="crypto-list">
                {cryptos.map(crypto => (
                    <button
                        key={crypto.id}
                        className="crypto-button"
                        onClick={() => handleCryptoSelect(crypto.id)}
                    >
                        {crypto.name}
                    </button>
                ))}
            </div>

            {selectedCrypto && (
                <div className="crypto-details">
                    <h3>{selectedCrypto.name} Details</h3>
                    <p><strong>Symbol:</strong> {selectedCrypto.symbol.toUpperCase()}</p>
                    <p><strong>Current Price:</strong> ${selectedCrypto.market_data.current_price.usd}</p>
                    <p><strong>Market Cap:</strong> ${selectedCrypto.market_data.market_cap.usd}</p>
                    <p><strong>24h Change:</strong> {selectedCrypto.market_data.price_change_percentage_24h.toFixed(2)}%</p>
                    <h4>Price History (Last 7 Days)</h4>
                    <Line data={chartData} />
                </div>
            )}
        </div>
    );
};

export default CryptoTracker;
