// Require Mongoose node module
const mongoose = require('mongoose');

// Create organization Schema
const organizationSchema = new mongoose.Schema({
    orgname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String
    },
    image: {
        type: String,
        default: 'http://www.placekitten.com/200/200'
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    event: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
})

// Use schema to create model
const Organization = mongoose.model('organization', organizationSchema)

// Export organization Model
module.exports = Organization;