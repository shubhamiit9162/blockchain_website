// Event controller
const Event = require('../models/Event');

// Create a new event
exports.createEvent = async (req, res) => {
    const { title, date, description } = req.body;
    try {
        const newEvent = new Event({ title, date, description });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Event creation failed", error });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving events", error });
    }
};
