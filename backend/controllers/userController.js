// User controller
const User = require('../models/User');

// Register new user
exports.registerUser = async (req, res) => {
    const { walletAddress, name } = req.body;
    try {
        const newUser = new User({ walletAddress, name });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "User registration failed", error });
    }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user", error });
    }
};
