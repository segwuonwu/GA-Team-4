import React, { useState, useEffect } from "react";
import { Typography, Button, List } from "@material-ui/core";
import EventItem from "../Components/EventComponent";
import ErrorMessage from "../Components/ErrorMessage";

function OrganizationUser(props) {

  const [events, setEvents] = useState([]);
  const [error, setError] = useState([]);

  useEffect(() => {
    fetch("")
      .then(response => {
        if (!response.ok) {
          setError("Couldn't reach database");
          return;
        }
        return response.json();
      }).then(events => {
        if (events.length < 1) {
          setError("No events to show right now");
        } else {
          setEvents(events);
        }
      }).catch(err => {
        setError("Couldn't retrieve events");
        console.log(err);
      })
  }, []);

  const eventList = () => {
    if (events) {
      return (
        <List>
        {
          events.map((item, index) => {
            return <EventItem event={item} key={index} />
          })
        }
        </List>
        )
    } else {
      return <ErrorMessage error={error} />
    }
  }

  return (
    <div>
      <Typography>Organization Title</Typography>
      <Typography>Organization Bio</Typography>
      <Button>Follow</Button>
      {eventList()}
    </div>
  );
}

export default OrganizationUser;