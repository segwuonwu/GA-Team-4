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

// router.put('/events/:id', (req, res) => {
//     db.Event.findById(req.params.id).populate('users')
//     .then(event => {
//         return event.update(req.body);
//     }).then(event => {
//         res.redirect('/users/events')
//     }).catch(err => {
//         console.log('Error Message', err);
//         res.send({message :'An error occured while adding event', err});
//     });
    
// });

router.post('/events/:id', (req, res) => {
    // First get the user from the DB using the id in req.user
    //Event Id is in req.params.id
    // user id is in req.user.id

    db.User.updateOne({ id: req.user.id }, { $addToSet: { events: req.params.id }})
    .then(updateInfo => {
        console.log('Life is gr8 m8')
        console.log(updateInfo)
        // Event has been added to user.events

        db.Event.updateOne().then(updateInfo2 => {
            res.send({message: 'of hope'})
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
        res.redirect('/users');
        //res.send(`${req.body.eventname} has been removed`)
    })
    .catch(err => res.send({message: 'Error deleting event', err}))
});

module.exports = router;

