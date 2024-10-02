import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import './JoinUs.css';

const JoinUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        interest: '',
    });
    const [message, setMessage] = useState(''); // State for message

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/join-us/', formData); // Use formData directly
            setMessage(res.data.msg); // Set message with response
            alert('Thank you for joining the Blockchain Club!');
        } catch (error) {
            setMessage('Error: ' + error.response?.data?.msg || 'Server error');
        }
    };

    return (
        <div className="join-us-container">
            <h1>Join Blockchain Club</h1>
            <p>Become part of our growing community and start exploring blockchain technology today.</p>
            
            <form className="join-us-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="interest">What are you interested in?</label>
                    <select 
                        id="interest" 
                        name="interest" 
                        value={formData.interest} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select your interest</option>
                        <option value="Blockchain Development">Blockchain Development</option>
                        <option value="Cryptocurrency">Cryptocurrency</option>
                        <option value="Smart Contracts">Smart Contracts</option>
                        <option value="NFTs">NFTs</option>
                        <option value="DeFi">Decentralized Finance (DeFi)</option>
                    </select>
                </div>

                <button type="submit" className="join-button">Join Now</button>
            </form>

            {message && <p>{message}</p>} {/* Display message if present */}

            <div className="learn-more-section">
                <h2>Why Join Us?</h2>
                <ul>
                    <li>Access exclusive resources and workshops</li>
                    <li>Connect with like-minded blockchain enthusiasts</li>
                    <li>Gain hands-on experience with blockchain projects</li>
                    <li>Participate in competitions and hackathons</li>
                    <li>Get mentorship from industry experts</li>
                </ul>
                <button className="learn-more-button" onClick={() => window.location.href = '/about'}>
                    Learn More
                </button>
            </div>
        </div>
    );
};

export default JoinUs;
