// Require needed node modules
require('dotenv').config()
const cors = require('cors')
const express = require('express')
const expressJwt = require('express-jwt')
const morgan = require('morgan')
const rowdyLogger = require('rowdy-logger')
const mongoose = require('mongoose');
const db = require('./models');
const path = require("path");

// Create an instance of express
const app = express();
const rowdyResults = rowdyLogger.begin(app)

// Middleware, etc
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX call)
app.use(express.static(path.join(__dirname, "client/build")));

// Declare controllers/route
app.use('/auth', expressJwt({
  secret: process.env.JWT_SECRET
}).unless({ // unless defines exceptions to the rule
  path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./routes/auth'))

//app.use('/auth', require('./routes/auth'))
app.use('/users', expressJwt({ secret: process.env.JWT_SECRET }), require('./routes/users'))
app.use('/organizations', expressJwt({ secret: process.env.JWT_SECRET }), require('./routes/organizations'))
app.use('/events', require('./routes/events'))

// Make 404 route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Listen
app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
  //console.log(`🎧 You're listening to the smooth sounds of port ${process.env.PORT || 3000} ☕️`)
});