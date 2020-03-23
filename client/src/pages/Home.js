import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Calendar from "../Components/Calendar";
import EventList from "../Components/EventList";
import OrgList from "../Components/OrgList";
import ErrorMessage from "../Components/ErrorMessage";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

function Home(props) {
  const [events, setEvents] = useState(null);
  const [organizations, setOrganizations] = useState(null);
  const [error, setError] = useState({
    events: null,
    organizations: null
  });
  const classes = useStyles();

  useEffect(() => {
    // Call events for a user
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/events`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.mernToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          setError({
            events: "Couldn't reach database",
            organizations: error.organizations
          });
          return;
        }
        return response.json();
      }).then(events => {
        if (events.length < 1) {
          setError({
            events: "No events to show right now",
            organizations: error.organizations
          });
        } else {
          setEvents(events);
        }
      }).catch(err => {
        setError({
          events: "Couldn't retrieve events",
          organizations: error.organizations
        })
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Call organizations for a user
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/organizations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.mernToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          setError({
            events: error.events,
            organizations: "Couldn't reach database"
          });
          return;
        }
        return response.json();
      }).then(organizations => {
        if (organizations.length < 1) {
          setError({
            events: error.events,
            organizations: "No organizations to show right now"
          });
        } else {
          setOrganizations(organizations);
        }
      }).catch(err => {
        setError({
          events: error.events,
          organizations: "Couldn't retrieve organizations"
        });
        console.log(err);
      });
  }, []);

  const eventList = () => {
    if (events) {
      return <EventList listType="event" events={events} />
    } else {
      return <ErrorMessage error={error.events} />
    }
  }

  const organizationList = () => {
    if (organizations) {
      return <OrgList listType="organization" organizations={organizations} />
    } else {
      return <ErrorMessage error={error.organizations} />
    }
  }

  if (!props.user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item md={1}>
          <Avatar alt="User Profile Picture" src={props.user ? props.user.image : "https://placekitten.com/200/200"} />
        </Grid>
        <Grid item md={3}>
          <Typography>
            Hello {props.user ? props.user.firstname : "User"}!
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.root}>
        <Grid item md={3}>
          { eventList() }
        </Grid>
        <Grid item md={8}>
          <Calendar events={events} />
        </Grid>
      </Grid>
      { organizationList() }
    </div>
  );
}

export default Home;