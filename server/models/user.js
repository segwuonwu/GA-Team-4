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
    password: {
        type: String,
        requied: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: 'http://www.placecage.com/200/200'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }
});

//using bcrypt to hash the password
userSchema.pre('save', function(next) {
    if (this.isNew) {
        this.password = bcypt.hashSync(this.password, 12)
    }

    next()
});

//Prevent password from getting sent out with the rest of the data
userSchema.set('toJSON', {
    transform: (doc, user) => {
        delete user.password
        delete user.__v
        return user
    }
});

// Helper function to compare the password hashes
userSchema.methods.isValidPassword = function (typedPassword) {
    return bcrypt.compareSync(typedPassword, this.password)
};

// Use schema to create model
const User = mongoose.model('user', userSchema)

// Export user model
module.exports = User;