const express = require('express');
const router = express.Router()
const db = require('../models/index')

router.get('/', (req, res) => {
    db.Organization.find()
        .then(organizations => {
        res.send(organizations)
    });
});

router.get("/:id", (req, res) => {
    db.Organization.findById(req.params.id)
        .then(organization => {
            db.Event.find({ organization: organization._id })
                .then(events => {
                    organization['events'] = events;
                    res.send(organization);
                }).catch(err => {
                    console.log(err);
                    res.send(organization);
                })
        }).catch(err => {
            res.send({ message: "Error retrieving organization" });
        });
});

// page to get a list of events
router.get('/events', (req, res) => {
    db.Event.find()
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting all events', err}))
});

//Show specific Event. 
router.get('/events/:id', (req, res) => {
    db.Event.findById(req.params.id)
        .then(events => {
            res.send(events);
    }).catch(err => res.send({message: 'Error in getting event', err}))
});

//Take form data to add a new events
router.post('/add', (req, res) => {
    let newEvent = {
        eventname: req.body.eventname,
        eventdate: req.body.eventdate,
        eventlocation: req.body.eventlocation,
        city: req.body.city,
        state: req.body.state,
        website: req.body.website,
        details: req.body.details
    }

    Object.keys(newEvent).forEach(key => (newEvent[key] == '') && delete newEvent[key]);
    db.Event.create(newEvent)
    .then(event => {
        res.send(event);
    })
    .catch(err => {
        console.log('Error Message', err);
        res.send({message :'An error occured creating new event', err});
    });
});

// Edit event form
router.get('/:id/edit', (req, res) => {
    db.Organization.findById(req.params.id)
    .then(event => {
        res.render('organisations/edit', { event: event })
    });
});

// update an event
router.put('/events/:id', (req, res) => {
    db.Event.findById(req.params.id)
    .then(event => {
        return event.update(req.body);
    }).then(event => {
        res.redirect('/organizations/events')
    }).catch(err => {
        console.log('Error Message', err);
        res.send({message :'An error occured while updating event', err});
    });
    
});

// Delete an event
router.delete('/events/:id', (req, res) => {
    console.log('---Delete route');
    let id = { _id: req.params.id }
    db.Event.deleteOne(id)
    .then(() => {
        console.log('Event deleted')
        res.redirect('/organizations');
    })
    .catch(err => res.send({message: 'Error deleting event', err}))
});
    

    
module.exports = router;