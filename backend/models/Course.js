const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: String,
    description: String,
    enrollmentCount: Number,
});

module.exports = mongoose.model('Course', CourseSchema);
