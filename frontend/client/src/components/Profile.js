import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Import your CSS file for styling

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        walletAddress: '',
        name: '',
    });

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users/profile'); // Adjust the URL as necessary
                setUser(response.data);
                setFormData({ walletAddress: response.data.walletAddress, name: response.data.name });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission to update user profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8080/api/users/profile', formData);
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user profile:", error);
        }
    };

    // Handle account deletion
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            try {
                await axios.delete('http://localhost:8080/api/users/profile'); // Adjust the URL as necessary
                alert("Account deleted successfully.");
                // Redirect or handle post-deletion logic here
            } catch (error) {
                console.error("Error deleting account:", error);
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div className="profile-info">
                <p><strong>Wallet Address:</strong> {user.walletAddress}</p>
                <p><strong>Name:</strong> {user.name}</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="edit-button">Edit Profile</button>
            <button onClick={handleDelete} className="delete-button">Delete Account</button>

            {isEditing && (
                <form onSubmit={handleSubmit} className="edit-form">
                    <h2>Edit Profile</h2>
                    <label>
                        Wallet Address:
                        <input
                            type="text"
                            name="walletAddress"
                            value={formData.walletAddress}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit" className="save-button">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Profile;
