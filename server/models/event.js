// Require Mongoose node module
const mongoose = require('mongoose');

// Create event Schema
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    website: String,
    details: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization'
    }
})

// Use schema to create model
const event = mongoose.model('event', eventSchema)

// Export event Model
module.exports = event;