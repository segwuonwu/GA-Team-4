// Require needed node modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./models');


// Create an instance of express
const app = express();

// Middleware, etc
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Declare controllers/route
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/organizations', require('./routes/organizations'))
app.use('/events', require('./routes/events'))

// Landing page route
// app.get('/', (req, res) =>{
//   res.render('landing');
// });


//M:M Relationship
const createEvent = function(event) {
  return db.Event.create(event).then(docEvent => {
    console.log("\n>> Created Event:\n", docEvent);
    return docEvent;
  });
};

const createUser = function(user) {
  return db.User.create(user).then(docUser => {
    console.log("\n>> Created User:\n", docUser);
    return docUser;
  });
};

const addUserToEvent = function(eventId, user) {
  return db.Event.findByIdAndUpdate(
    eventId,
    // $ appends the aray to a single element
    { $push: { users: user._id } },
    { new: true, useFindandModify: false }
  );
};

const addEventToUser = function(userId, event) {
  return db.User.findByIdAndUpdate(
  userId,
  { $push: { events: event._id }},
  { new: true, useFindAndModify: false }
  );
};

// //TEST INFO
// const run = async function() {
//   var event1 = await createEvent({
//    eventname: 'event1',
//    eventdate: "4/20/2020",
//    eventlocation: 'Yo boys crib',
//    city: 'Seattle',
//    state: "WA",
//    details: 'Come hang with yo boy at his crib.',
//    firstname: 'Shawhizzle'
//   });

//   var userA = await createUser({
//     firstname: 'Shawhizzle',
//     lastname: "Sohrahizzle",
//     password: 'manizzle',
//     email: 'shawhizzle@manizzzzzzle.com',
//     details: 'yo, i got hella cute cats, and im cool af. Imma come make this party littttttt!',
//     eventname: 'event1'
//   });

//   var userB = await createUser({
//     firstname: 'Eros',
//     lastname: 'Boo',
//     password: 'mydadisthebest',
//     email: 'erosboo@shawhizzzzzzzle.com',
//     details: 'yeah, you heard my dad. We gon fire this uppp! We cute af and hes the coolest cat we know.',
//     eventname: 'event1'
//   });
    
    var event = await addUserToEvent(event1._id, userA);
    console.log("\n>> event1:\n", event);
    
    var user =  await addEventToUser(userA._id, event1);
    console.log("\n>> userA:\n", user);
    
    event = await addUserToEvent(event1._id, userB);
    console.log("\n>> event1:\n", event);
    
    user = await addEventToUser(userB._id, event1);
    console.log('\n userB:\n', user);

  var event2 = await createEvent({
    firstname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  event = await addUserToEvent(event2._id, userB);
  console.log('\n>> event2:\n', event);

  user = await addEventToUser(userB_.id, event2);
  console.log("\n>> userB:\n", user);
};

run();

// Make 404 route
app.get('/', (req, res) => {
  res.send({'error': 'page not found'});
});

// Listen
app.listen(process.env.PORT || 3000, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${process.env.PORT || 3000} ☕️`)
});