// userController.js
const User = require('../models/User');

// Register new user
exports.registerUser = async (req, res) => {
    const { walletAddress, name, username } = req.body; // Include username
    try {
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const newUser = new User({ walletAddress, name, username }); // Include username
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "User registration failed", error });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
      
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user:", error); // Log the error for debugging
        res.status(500).json({ message: "Error retrieving user", error: error.message });
    }
};
