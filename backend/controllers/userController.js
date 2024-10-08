// userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');



exports.registerUser = async (req, res) => {
    const { walletAddress, name } = req.body;
    try {
        const newUser = new User({ walletAddress, name });
        await newUser.save();
        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token: token // 
        });
    } catch (error) {
        res.status(500).json({ message: "User registration failed", error });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return the user data
        res.status(200).json(user);
    } catch (error) {
        // Log the error for debugging
        console.error("Error retrieving user profile:", error);
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};
