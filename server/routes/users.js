const express = require('express');
const router = express.Router()
const db = require('../models/index')


//Get list of events
router.get('/', (req, res) => {
    db.Event.find({})
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting all events', err}))
})

//Show specific event. 
router.get('/:id', (req, res) => {
    db.Event.findById(req.params.id)
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting event', err}))
})
