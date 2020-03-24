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


router.post('/events/:id', (req, res) => {
    // First get the user from the DB using the id in req.user
    //Event Id is in req.params.id
    // user id is in req.user.id

    db.User.findByIdAndUpdate(req.user._id,
        { $push: { events: req.params.id } },
        { new: true, useFindAndModify: false })
    .then(updateInfo => {
        console.log('Event has added')
        console.log(updateInfo)
        // Event has been added to user.events
        db.Event.updateOne().then(updateInfo2 => {
            console.log(updateInfo2)
            res.send({message: `${req.body.eventname}`})
        })
    })
    .catch(err => {
      console.log('Server error', err)
      res.status(500).send({ message: 'Server error' })
    })
})

router.post('/organizations/:id', (req, res) => {
    db.User.findByIdAndUpdate(req.user._id,
        { $push: { organizations: req.params.id } },
        { new: true, useFindAndModify: false })
    .then(updateInfo => {
        console.log('organization added');
        console.log(updateInfo);
        // organization has been added to user.events
        db.Organization.updateOne().then(updateInfo2 => {
            console.log(updateInfo2);
            res.send({message: `${req.body.orgname}`})
        })
    })
    .catch(err => {
      console.log('Server error', err)
      res.status(500).send({ message: 'Server error' })
    })
})

// Delete an event
router.delete('/events/:id', (req, res) => {
    console.log('---Delete route');
    let id = { _id: req.params.id }
    db.Event.deleteOne(id)
    .then(() => {
        console.log('Event deleted')
        res.redirect('/');
        //res.send(`${req.body.eventname} has been removed`)
    })
    .catch(err => res.send({message: 'Error deleting event', err}))
});

module.exports = router;

