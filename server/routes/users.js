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
        { $addToSet: { organizations: req.params.id } },
        { new: true, useFindAndModify: false })
    .then(updateInfo => {
        // organization has been added to user.organizations
        db.Organization.findByIdAndUpdate(req.params.id, 
            { $addToSet: { users: req.user._id }},
            { new: true, userFindAndModify: false })
            .then(updatedOrg => {
                res.send({ message: "User now following organization" });
            }).catch(err => {
                res.send({ message: "Unable to follow organization" });
            });
    })
    .catch(err => {
      console.log('Server error', err)
      res.status(500).send({ message: 'Server error' })
    });
});

router.put('/edit', (req, res) => {
    db.User.findOneAndUpdate(req.body._id,
        {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                image: req.body.image
            }
        }, {
        sort: { _id: -1 }, upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
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

