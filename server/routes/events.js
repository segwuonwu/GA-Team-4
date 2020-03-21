const express = require('express');
const router = express.Router()
const db = require('../models/index')

router.get('/', (req, res) => {
    db.Event.find()
        .then(event => {
        res.send(event)
    });
});

module.exports = router;