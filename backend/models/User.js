const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    role: String,  // Admin/Student
    email: String,
});

module.exports = mongoose.model('User', UserSchema);
