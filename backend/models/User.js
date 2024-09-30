// User model schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    walletAddress: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contributions: { type: Number, default: 0 },
    tier: { type: String, enum: ['Bronze', 'Silver', 'Gold'], default: 'Bronze' }
});

module.exports = mongoose.model('User', userSchema);
