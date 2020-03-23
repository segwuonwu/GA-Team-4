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

function EventSearchItem(props) {
  const classes = useStyles();
  console.log(props.event);

    return (
      <ListItem className={classes.root}>
        <ListItemText 
          primary={props.event.eventname ? props.event.eventname : "Name" }
          secondary={props.event.eventdate ? props.event.eventdate : "No date" }
        />
        <Typography>{props.event.organization ? props.event.organization.orgname : "org name"}</Typography>
        <Button>RSVP</Button>
      </ListItem>
    );
  }
  
  export default EventSearchItem;