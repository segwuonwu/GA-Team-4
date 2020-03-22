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

//****1:M Relationship between Organization and Event****

const createOrganization = function(organization)  {
  return db.Organization.create(organization).then(docOrganization => {
    console.log("\n>> Created Organization:\n", docOrganization);
  });
};

const newEvent = function(organizationId, event) {
  console.log("\n>>  Add Event:\n", event);
  return db.Organization.findByIdAndUpdate(
    organizationId,
    {
      $push: {
        events: {
          eventname: event.name,
          eventdate: event.date,
          eventlocation: event.eventlocation,
          city: event.city,
          state: event.state,
          website: event.website,
          details: event.details,
        }
      }
    },
    { new: true, useFindAndModify: false }
  );
};

// // //TEST INFO for 1:M
// const run = async function() {
//   var organization = await createOrganization({
//     orgname: 'Shawhizzles Shack of Splendor',
//     email: 'shawhizzle@shackofsplendor.com',
//     password: 'bringcats',
//     image: 'http://placecage.com/200/200',
//   });
//   console.log('\n>> Organization:\n', organization);

//   organization = await newEvent(organization._id, {
//     eventname: "Cat Collection",
//     eventdate: '4/20/2020',
//     eventlocation: 'Shawhizzles Shack',
//     city: 'Seattle',
//     state: 'WA',
//     website: 'www.shawhizzleshouseofsplendor.com',
//     details: 'This may sound creepy, but we do NOT harm cats. We love them and want to catch em all and love them forever'
//   });
//   console.log("\n>> Organization:\n", organization)
// };



//****M:M Relationship between User and Event****

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

//TEST INFO for M:M
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
//     details: 'yo, i got hella cute cats, and im cool af. Come visit!',
//     eventname: 'event1'
//   });

//   var userB = await createUser({
//     firstname: 'Eros',
//     lastname: 'Boo',
//     password: 'mydadisthebest',
//     email: 'erosboo@shawhizzzzzzzle.com',
//     details: 'yeah, you heard my dad. Come visit us. We cute af and hes the coolest cat we know.',
//     eventname: 'event1'
//   });
    
    var event = addUserToEvent(event1._id, userA);
    console.log("\n>> event1:\n", event);
    
    var user = addEventToUser(userA._id, event1);
    console.log("\n>> userA:\n", user);
    
    event =  addUserToEvent(event1._id, userB);
    console.log("\n>> event1:\n", event);
    
    user =  addEventToUser(userB._id, event1);
    console.log('\n userB:\n', user);

  var event2 =  createEvent({
    firstname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  event = addUserToEvent(event2._id, userB);
  console.log('\n>> event2:\n', event);

  user = addEventToUser(userB_.id, event2);
  console.log("\n>> userB:\n", user);
// };

const getEventWithPopulate = function(id) {
  return db.Event.findById(id).populate('users');
};

const getUserWithPopulate = function(id) {
  return db.User.findById(id).populate('events');
};

//****M:M between User and Organization****

const addUserToOrganization = function(organizationID, user) {
  return db.User.findByIdAndUpdate(
    organizationId,
    { $push: { tags: user._id } },
    { new: true, useFindAndModify: false}
  );
};

const addOrganizationToUser = function(userId, organization) {
  return  db.User.findByIdAndUpdate(
    userId,
    { $push: { organizations: organization._id } },
    { new: true, useFindAndModify: false }
  );
};

// //TEST INFO User and Organization
// const run = async function() {
//   var org1 = await createOrganization({
//     orgname: 'Animal Crossing',
//     email: 'tomnook@ac.com',
//     password: 'bells'
//   });

//   var user1 = await createUser({
//     firstname: 'Tom',
//     lastname: 'Nooks',
//     password: 'bells',
//     email: 'tomnooks@ac.com'  
//   });

//   var user2 = await createUser({
//     firstname: 'Isabelle',
//     lastname: '????',
//     password: 'wtfisisabelleslastname?',
//     email: 'isabelle@nolastname.com'
//   });

  var organization = addUserToOrganization(org1._id, user1);
  console.log("\n>> org1:\n");

  var userorg = addOrganizationToUser(user1._id, org1);
  console.log("\n user1:\n", user);
  

  organization = addUserToOrganization(org1._id, user2);
  console.log('\n>> org1:\n', organization);

  userorg = addUserToOrganization(user2._id, org1);
  console.log("\n>> user2:\n", user );

  var organization2 = createOrganization({
    orgname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization'
    }
  });

  organization = addUserToOrganization(organization2._id, user2);
  console.log('\n>> organization2:\n', organization);

  user = addOrganizationToUser(user2._id, organization2);
  console.log('\n>> user2:\n', user);

  const getUserWithPopulate = function(id) {
    return db.User.findById(id).populate('organizations');
  };
  
  const getOrganizationsWithPopulate = function(id) {
    return db.Organization.findById(id).populate('Users');
  };
// };

run();

// Make 404 route
app.get('/', (req, res) => {
  res.send({'error': 'page not found'});
});

// Listen
app.listen(process.env.PORT || 3000, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${process.env.PORT || 3000} ☕️`)
});