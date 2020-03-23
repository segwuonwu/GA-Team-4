import React from 'react';
import { ListItem, ListItemText, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function EventComponent(props) {
  const classes = useStyles();
  console.log(props.event);

  const addEvent = () => {
    console.log(`Going to event id ${props.event._id}`)
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/events/${props.event._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mernToken')}`
      },
      body: JSON.stringify({
        test: 'test'
      })
    }).then(response => {
      response.json().then(result => {
        console.log('all good')
      }).catch(function(err){console.log(err)})
    }).catch((err)=>console.log(err))
  }

    return (
      <ListItem className={classes.root}>
        <ListItemText 
          primary={props.event.eventname ? props.event.eventname : "Name" }
          secondary={props.event.eventdate ? props.event.eventdate : "No date" }
        />
        <Typography>{props.event.organization ? props.event.organization.orgname : "org name"}</Typography>
        <Button onClick={addEvent}>RSVP</Button>
      </ListItem>
    );
  }
  
  export default EventComponent;