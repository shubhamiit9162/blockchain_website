const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    name: String,
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', ReportSchema);
