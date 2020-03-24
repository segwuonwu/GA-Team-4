import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Typography, Button, List } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EventSearchItem from "../Components/EventSearchItem";
import ErrorMessage from "../Components/ErrorMessage";

const useStyles = makeStyles(theme => ({
  eventList: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    width: "45%,",
    margin: "1em 0 0 28%",
  },
  showOrganization: {
    color: theme.palette.secondary.dark,
    fontWeight: "bold"
  }
}))

function OrganizationUser(props) {

  const classes = useStyles();

  const [organization, setOrganization] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState({
    organization: null,
    events: null
  });

  // Will be used when passing in the actual url
  const {orgId} = useParams();

  useEffect(() => {
    // Organization
    fetch(`${process.env.REACT_APP_SERVER_URL}/organizations/${orgId}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mernToken')}`
      }
    })
      .then(response => {
        if (!response.ok) {
          setError({
            ...error,
            organization: "Couldn't reach database"
          });
          return;
        } else {
          return response.json();
        }
      }).then(organization => {
        setOrganization(organization);
        setEvents(organization.events);
      }).catch(err => {
        setError({
          ...error,
          organization: "Couldn't retrieve organization"
        });
        console.log(err);
      });
  }, []);

  const eventList = () => {
    if (events) {
      return (
        <List>
        {
          events.map((item, index) => {
            return <EventSearchItem event={item} key={index} />
          })
        }
        </List>
        )
    } else {
      return <ErrorMessage error={error} />
    }
  }

  const followOrganization = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/organizations/${organization._id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('mernToken')}`
      },
      body: JSON.stringify({
        _id: organization._id
      })
    }).then(response => {
      response.json().then(result => {
        console.log(result);
      }).catch(function(err){console.log(err)})
    }).catch((err)=>console.log(err))
  }

  const showOrganization = () => {
    if (organization) {
      return (
        <div className={classes.ShowOrganization}>
          <Typography>{organization.orgname ? organization.orgname : "Organization"}</Typography>
          <Typography>{organization.email ? organization.email : "No Email"}</Typography>
          <Typography>Volunteers Following: { organization.users ? organization.users.length : 0 }</Typography>
          <Button onClick={() => followOrganization()}>Follow</Button>
          {eventList()}
        </div>
      )
    } else {
      return (
        <ErrorMessage error={error.organization} />
      )
    }
  }

  return (
    <div>
      { showOrganization() }
    </div>);
}

export default OrganizationUser;
