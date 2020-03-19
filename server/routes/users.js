const express = require('express');
const router = express.Router()
const db = require('../models/index')


// page to get a list of events
router.get('/', (req, res) => {
    db.Event.find({})
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting all events', err}))
})

// router.post('/:id', (req, res) => { 
//     db.User.create(req.body.id)
//         .then(event => {
//         res.send(event)
//     }).catch(err => {
//         console.log('Server error', err)
//         res.status(500).send({ message: 'Server error' })
//     })
// })

// router.post('/', (req, res) => {
//     db.User.findOne(req.user.id)
//     .then(user => {
//         user.event.push({
//             name: req.body.name,
//             date: req.body.date,
//             city: req.body.city,
//             state: req.body.state,
//             location: req.body.location,
//             websitel: req.body.website,
//             detail: req.body.detail
//         })
//         // Save the changes to the DB
//             user.save().then(() => {
//             res.send({ event: user.event})
//         })
//         .catch(err => {
//             console.log('Aww suck', err)
//             res.status(503).send({ message: 'Error saving document' })
//         })
//     }).catch(err => {
//         console.log('Server error', err)
//         res.status(500).send({ message: 'Server error' })
//       })
// })

//Show specific Event. 
router.get('/:id', (req, res) => {
    db.Event.findById(req.params.id)
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting event', err}))
})

// Delete an event
router.delete('/:id', (req, res) => {
    console.log('---Delete route');
    let id = { _id: req.params.id }
    db.Event.deleteOne(id)
    .then(() => {
        console.log('Event deleted')
        //res.redirect('/users');
        res.send(`${req.body.eventname} has been removed`)
    })
    .catch(err => res.send({message: 'Error deleting event', err}))
})
    


module.exports = router;