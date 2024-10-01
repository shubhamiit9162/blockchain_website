const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'student' }, // 'student' or 'admin'
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Admin', userSchema);
