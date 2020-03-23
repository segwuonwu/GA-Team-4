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
    console.log(req.params.id)
    console.log(req.user)
    // db.User.findOne(req.user.id)
    // .then(user => {
    //   // Push a new event to the user's event array
    //     user.push({ _id: req.params._id })
    //   // Save the changes to the DB
    //   user.save().then(() => {
    //     res.send({ events: user.events})
    //   })
    //   .catch(err => {
    //     console.log('Aww suck', err)
    //     res.status(503).send({ message: 'Error saving document' })
    //   })
    // })
    // .catch(err => {
    //   console.log('Server error', err)
    //   res.status(500).send({ message: 'Server error' })
    // })
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

