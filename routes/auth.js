require('dotenv').config()
let db = require('../models')
let jwt = require('jsonwebtoken')
let router = require('express').Router()

//POST /auth/login (find user and send token)
router.post('/login', (req, res) => {
    console.log(req.body)
    db.User.findOne({ email: req.body.email})
    .then(user => {
        //make sure user exists and has a password
        if (!user || !user.password) {
            return res.status(404).send({ message: 'User not found!' })
        }

        //check if password is correct
        if (!user.isValidPassword(req.body.password)) {
            return res.status(401).send({ message: 'Invalid Credentials' })
        }

        //user checks out - now issue a token and send it
        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 8 //user must relog in 8 hours
        })
        res.send({ token })
    }).catch( err => {
        console.log('Error in POST /auth/login', err)
        res.status(503).send({ message: 'Database or server-side error'})
    });
});

// POST to /auth/signup (create user and generate token)
router.post('/signup', (req, res) => {
    console.log(req.body)
    //make sure user does not exist and is not a duplicate
    db.User.findOne({ email: req.body.email })
    .then(user => {
        //if user exists, do not let them make another account
        if (user) {
            return res.status(409).send({ message: 'Email address is in use!' })
        }

        db.User.create(req.body)
        .then(newUser => {
            db.Organization.find().then(organizations => {
                db.Organization.findByIdAndUpdate(organizations[0]._id, 
                    { $push: { users: newUser._id }},
                    { new: true, useFindAndModify: false }
                ).then(organization => {
                    db.User.findByIdAndUpdate(newUser._id, 
                        { $push: { organizations: organization._id }},
                        { new: true, useFindAndModify: false }
                    ).then(user => {
                        //make user a token
                        let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                            expiresIn: 60 * 60 * 8 //user must relog in 8 hours
                        })
                        //send token
                        res.send({ token })
                    }).catch(err => {
                        console.log("couldn't add organization to user");
                    })
                }).catch(err => {
                    console.log("couldn't add user to organization");
                });
            }).catch(err => {
                console.log("Couldn't add organization");

                //make user a token
                let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 8 //user must relog in 8 hours
                })
                //send token
                res.send({ token })
            });
        }).catch(err => {
            console.log('Error when creating user', err)
            if (err.name  === 'ValidationError') {
                res.status(406).send({ message: 'Validation Error!' })
            } else {
                res.status(500).send({ message: 'Error creating user' })
            }
        });
    })
    .catch(err => {
        console.log('Error in POST /auth/signup', err)
        res.status(503).send({ message: 'Database or server error' })
    });
});

router.get('/home', (req, res) => {
    res.send({ message: 'Secret message for people who are logged in only! '}) 
});

module.exports = router;