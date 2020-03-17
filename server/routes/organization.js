const express = require('express');
const router = express.Router()
const db = require('../models/index')

//Show page for specific museum. Include list of pieces!
router.get('/:id', (req, res) => {
    db.Organization.findById(req.params.id)
        .then(museums => {
            res.send(museums);
    }).catch(err => res.send({message: 'Error in getting one mesuems', err}))
})

//Take form data to add a new events
router.post('/', (req, res) => {
    let newEvent = {
        name: req.body.name,
        date: req.body.date,
        city: req.body.city,
        state: req.body.state,
        location: req.body.location,
        webUrl: req.body.website,
        detail: req.body.detail
    }

    Object.keys(newEvent).forEach(key => (newEvent[key] == '') && delete newEvent[key]);
    db.Organization.create(newEvent)
    .then(event => {
        res.send(event);
    })
    .catch(err => {
        console.log('Error Message', err);
        res.send({message :'An error occured', err});
    });
  });
  