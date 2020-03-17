let mongoose = require('mongoose')

//Create event Schema
const eventSchema = mongoose.Schema({
    orgname: {
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
    }
});

//export event
module.exports = mongoose.model('Event', eventSchema)