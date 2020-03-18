const express = require('express');
const router = express.Router()
const db = require('../models/index')

// page to get a list of events
router.get('/', (req, res) => {
    db.User.find()
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting all events', err}))
})

//Show specific Event. 
router.get('/:id', (req, res) => {
    db.User.findById(req.params.id)
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting event', err}))
})

// Delete an event
router.delete('/:id', (req, res) => {
    console.log('---Delete route');
    db.User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.redirect('/user');
    })
    .catch(err => res.send({message: 'Error deleting event', err}))
})
    


module.exports = router;