// User routes
const express = require('express');
const { registerUser, getUserProfile } = require('../controllers/userController');
const { authenticate } = require('../utils/auth');

const router = express.Router();

router.post('/register', registerUser);
router.get('/profile', authenticate, getUserProfile);

module.exports = router;
