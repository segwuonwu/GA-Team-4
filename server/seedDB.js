const db = require('./models');

db.Event.create({
    eventname: 'World Relief Volunteer Orientation',
    eventdate: '3/28/2020',
    eventlocation: 'World Relief Seattle',
    website: 'https://worldreliefseattle.org/volunteer',
    details: 'This is an orientation for volunteers who wish to come alongside new refugees, asylees, and immigrants in vulnerable situations in Western Washington. We will be learning about who we serve, what the journey and resettlement process looks like for refugees and asylees, and how the local community can come alongside in support and care.',
    organization: 'World Relief Seattle'
})
.then(result => {
    console.log(`${eventname} has been created!`);
})
.catch(err => {
    console.log('Error Message', err);
});


db.Event.create({
    eventname: 'Heritage Park Spring Clean',
    eventdate: '4/8/2020',
    eventlocation: 'Heritage Park',
    website: '',
    details: 'Gather your family, friends and coworkers and volunteer at Heritage Park at our Spring Clean event. Volunteers will have the opportunity to do some inside cleaning of park buildings and work outside weeding, landscaping and hauling. No equipment needed. Hope to see you there!',
    organization: 'Heritage Park'
})
.then(result => {
    console.log(`${eventname} has been created!`);
})
.catch(err => {
    console.log('Error Message', err)
});
