import React from 'react';
import { List, Typography } from "@material-ui/core";
import EventHomeItem from "./EventHomeItem";
//host, date, time, where, # of volunteers

function EventList(props) {
      return(
        <div>
          <Typography>Upcoming Events</Typography>
          <List>{
            props.events.map((item, index) => {
              return (<EventHomeItem event={item} key={index} />);
            })
            }
          </List>
        </div>
      );
  }
  
  export default EventList;