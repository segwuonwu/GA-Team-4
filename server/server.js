// Require needed node modules
const express = require('express');
const cors = require('cors')

// Create an instance of express
const app = express();

// Middleware, etc
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Declare controllers/route
app.use('/users', require('./routes/users'))
app.use('/organizations', require('./routes/organizations'))

// Landing page route
// app.get('/', (req, res) =>{
//   res.render('landing');
// });


// Make 404 route
app.get('/', (req, res) => {
  res.send({'error': 'page not found'});
});

// Listen
app.listen(process.env.PORT || 3000, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${process.env.PORT || 3000} ☕️`)
});