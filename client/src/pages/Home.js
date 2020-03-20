import React, { useState, useEffect } from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/sass/styles.scss";
import moment from "moment";
import SideList from "../Components/SideList";
import ErrorMessage from "../Components/ErrorMessage";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function Home(props) {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    fetch()
      .then(response => {
        if (!response.ok) {
          setError("Couldn't reach database");
          return;
        }
        return response.json();
      }).then(events => {
        if (events.length < 1) {
          setError("No event to show right now");
        } else {
          setEvents(events);
        }
      }).catch(err => {
        setError("Couldn't retrieve events")
        console.log(err);
      })
  }, []);

  const eventList = () => {
    if (events) {
      return <SideList listType="event" events={events} />
    } else {
      return <ErrorMessage error={error} />
    }
  }

  return (
    <div>
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={1}>
          <Avatar alt="User Profile Picture" src={props.user ? props.user.image : "https://placekitten.com/200/200"} />
        </Grid>
        <Grid item md={3}>
          <Typography>
            Hello {props.user ? props.user.firstname : "User"}!
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={3}>
          { eventList() }
        </Grid>
        <Grid item md={9}>
          <Calendar 
            className="calendar"
            localizer={localizer}
            events={[]} />
        </Grid>
      </Grid>
      <SideList listType="organization" organizations={[]} />
    </div>
  );
}

export default Home;