// Require Mongoose node module
const mongoose = require('mongoose');

// Create organization Schema
const organizationSchema = new mongoose.Schema({
    name: {
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
    image: {
        type: String,
        default: 'http://www.placekitten.com/600/400'
    }
})

// Use schema to create model
const Organization = mongoose.model('organization', organizationSchema)

// Export organization Model
module.exports = Organization;