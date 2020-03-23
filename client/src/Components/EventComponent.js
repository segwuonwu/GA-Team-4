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
  console.log("Clicked")
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/events/${props.event.id}`, {
      method: 'POST',
      body: {
        test: 'test'
      }
    }).then(response => response.json()).then(result => {
      console.log('all good')
    }).catch(err=>console.log(err))
  }

    return (
<<<<<<< HEAD
      <ListItem>
        <button onClick={addEvent}>Test Button</button>
=======
      <ListItem className={classes.root}>
>>>>>>> upstream/master
        <ListItemText 
          primary={props.event.eventname ? props.event.eventname : "Name" }
          secondary={props.event.eventdate ? props.event.eventdate : "No date" }
        />
        <Typography>{props.event.organization ? props.event.organization.orgname : "org name"}</Typography>
        <Button>RSVP</Button>
      </ListItem>
    );
  }
  
  export default EventComponent;