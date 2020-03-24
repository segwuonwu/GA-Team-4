const express = require('express');
const router = express.Router()
const db = require('../models/index')

router.get('/', (req, res) => {
    db.Event.find()//.populate("organization", "orgname -_id")
        .then(event => {
            console.log(event)
        res.send(event)
    });
});

module.exports = router;