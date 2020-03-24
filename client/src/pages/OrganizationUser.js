import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Typography, Button, List } from "@material-ui/core";
import EventSearchItem from "../Components/EventSearchItem";
import ErrorMessage from "../Components/ErrorMessage";

function OrganizationUser(props) {

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
        <div>
          <Typography>{organization.orgname ? organization.orgname : "Organization Title"}</Typography>
          <Typography>{organization.email ? organization.email : "Organization Email"}</Typography>
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