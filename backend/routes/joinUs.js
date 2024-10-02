// routes/joinUs.js

const express = require('express');
const router = express.Router();
const User = require('../models/join');

// POST /api/join-us
router.post('/', async (req, res) => {
    const { name, email, interest } = req.body;

    if (!name || !email) {
        return res.status(400).json({ msg: 'Please provide name and email' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const newUser = new User({ name, email });
        await newUser.save();

        res.status(201).json({ msg: 'User successfully registered!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
