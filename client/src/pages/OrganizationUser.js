import React from "react";
import { useState } from "react";
import { Typography, Button, List } from "@material-ui/core";
import EventItem from "../Components/EventComponent";

function OrganizationUser() {

  const [events, setEvents] = useState([]);

  return (
    <div>
      <Typography>Organization Title</Typography>
      <Typography>Organization Bio</Typography>
      <Button>Follow</Button>
      <List>
      {
        events.map((item, index) => {
          return <EventItem event={item} key={index} />
        })
      }
      </List>
    </div>
  );
}

export default OrganizationUser;