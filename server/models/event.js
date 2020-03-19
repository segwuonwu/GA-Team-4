// Require Mongoose node module
const mongoose = require('mongoose');

// Create event Schema
const eventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true
    },
    eventdate: {
        type: String,
        required: true
    },
    eventlocation: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    details: {
        type: String,
        required: true
    },
    organization: {
        type: String
    }
});

// Use schema to create model
const Event = mongoose.model('event', eventSchema)

// Export event model
module.exports = Event;