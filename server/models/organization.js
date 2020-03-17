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
        default: 'http://www.placecage.com/200/200'
    }
});

// Export organization
module.exports = mongoose.model('organization', organizationSchema)