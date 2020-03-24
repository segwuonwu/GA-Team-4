import React from 'react';
import { List, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventHomeItem from "./EventHomeItem";
//host, date, time, where, # of volunteers

const useStyles = makeStyles(theme => ({
  list: {
    marginLeft: "2em",
    background: "#eee",
    borderRadius: "10px",
    minHeight: "64.5vh"
  },
  header: {
    paddingTop: "1.5em",
    marginTop: "1.5em",
    marginLeft: "1em",
    fontWeight: "bold",
    color: theme.palette.primary.dark
  }
}));

function EventList(props) {
  const classes = useStyles();
      return(
        <div
          className={classes.list}>
          <Typography
            variant="h5"
            className={classes.header}>
              Upcoming Events
          </Typography>
          <List>{
            props.events.map((item, index) => {
              return (<EventHomeItem event={item} key={index} />);
            })
            }</List>
        </div>
      );
  }
  
  export default EventList;