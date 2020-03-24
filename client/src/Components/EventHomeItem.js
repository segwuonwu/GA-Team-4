import React from "react";
import { ListItem, ListItemText, Typography, Paper, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"; 

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: "1em"
  }, 
  card: {
    padding: "1em"
  }
}));

function EventHomeItem(props) {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <Paper className={classes.card}>
        <ListItemText
          primary={props.event.eventname ? props.event.eventname : "Event"}
          secondary={props.event.eventdate ? props.event.eventdate : "No Date" }/>
      </Paper>
    </ListItem>
  )
}

export default EventHomeItem;