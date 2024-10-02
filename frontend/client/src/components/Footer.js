// Footer.js
import React from 'react';
import './Footer.css'; // Create and style this CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <p>Follow us on social media:</p>
            <div className="social-media-links">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </footer>
    );
};

export default Footer;
