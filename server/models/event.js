let mongoose = require('mongoose')

//Create event Schema
const eventSchema = mongoose.Schema({
    name: {
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
    eventwebsite: {
        type: string
    },
    details: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'organization'
    }
});

// Use schema to create model
const Event = mongoose.model('event', eventSchema)

// Export event model
module.exports = Event;