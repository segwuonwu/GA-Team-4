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
    fetch("")
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
        // Events - Nested inside our organization call because if we can't get the organziation, we can't get the events tied to it.
        fetch("")
          .then(response => {
            if (!response.ok) {
              setError({
                ...error,
                events: "Couldn't reach database"
              });
              return;
            }
            return response.json();
          }).then(events => {
            if (events.length < 1) {
              setError({
                ...error,
                events: "No events to show right now"
              });
            } else {
              setEvents(events);
            }
          }).catch(err => {
            setError({
              ...error,
              events: "Couldn't retrieve events"
            });
            console.log(err);
          })
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

  const showOrganization = () => {
    if (organization) {
      return (
        <div>
          <Typography>Organization Title</Typography>
          <Typography>Organization Bio</Typography>
          <Button>Follow</Button>
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