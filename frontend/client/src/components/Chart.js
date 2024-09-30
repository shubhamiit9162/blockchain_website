import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const CryptoLineChart = ({ data }) => {
    const chartData = {
        labels: data.map(point => point.time), // Assume 'time' is your label
        datasets: [
            {
                label: 'Price',
                data: data.map(point => point.price), // Assume 'price' is your data point
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Real-Time Crypto Prices',
            },
        },
    };

    return <Line options={options} data={chartData} />;
};

export default CryptoLineChart;
