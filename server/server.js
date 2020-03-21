// Require needed node modules
require('dotenv').config()
let cors = require('cors')
let express = require('express')
let expressJwt = require('express-jwt')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

// Create an instance of express
const app = express();
let rowdyResults = rowdyLogger.begin(app)

// Middleware, etc
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX call)


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
  res.send({'error': 'page not found'});
});

// Listen
app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
  //console.log(`🎧 You're listening to the smooth sounds of port ${process.env.PORT || 3000} ☕️`)
});