const express = require('express');
const router = express.Router()
const db = require('../models/index')


router.get('/', (req, res) => {
    res.send('Welcome to user profile');
});

// page to get a list of events
router.get('/events', (req, res) => {
    db.User.findById(req.user._id).populate("events")
        .then(updatedUser => {
            res.send(updatedUser.events);
        }).catch(err => res.send({message: 'Error in getting all events', err}))
});

router.get("/organizations", (req, res) => {
    db.User.findById(req.user._id).populate("organizations")
    .then(updatedUser => {
        res.send(updatedUser.organizations);
    }).catch(err => {
        res.send({ message: "Error in getting all organizations" });
    });
});

//Show specific Event. 
router.get('/events/:id', (req, res) => {
    db.Event.findById(req.params.id)
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting event', err}))
});

// Delete an event
router.delete('/events/:id', (req, res) => {
    console.log('---Delete route');
    let id = { _id: req.params.id }
    db.Event.deleteOne(id)
    .then(() => {
        console.log('Event deleted')
        res.redirect('/users');
        //res.send(`${req.body.eventname} has been removed`)
    })
    .catch(err => res.send({message: 'Error deleting event', err}))
});

module.exports = router;

