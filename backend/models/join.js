// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    interest: {
        type: String, // You can adjust the type based on your requirements (e.g., String, Array)
        required: true // Make it required if you want users to specify their interest
    }
});

module.exports = mongoose.model('join', UserSchema);
