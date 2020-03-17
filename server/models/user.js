// Require Mongoose node module
const mongoose = require('mongoose');
let bcrypt = require('bcryptjs')

// Create user Schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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
const user = mongoose.model('user', userSchema)

// Export user Model
module.exports = user;