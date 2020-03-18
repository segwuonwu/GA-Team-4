import React from 'react';
import { List, Typography } from "@material-ui/core";
import OrgComponent from "./OrgComponent";
import EventComponent from "./EventComponent";

//host, date, time, where, # of volunteers

function SideList(props) {
  switch(props.listType) {
    case "event":
      return(
        <div>
          <Typography>Upcoming Events</Typography>
          <List>{
            props.events.map((item, index) => {
              return (<EventComponent event={item} key={index} />);
            })
            }
          </List>
        </div>
      );
    case "organization":
      return(
        <div>
          <Typography>Affiliated Organizations</Typography>
          <List>{
            props.organizations.map((item, index) => {
              return(<EventComponent organization={item} key={index} />)
            })
            }
          </List>
        </div>
      );
    default:
      return(
        <div>
        </div>
      );
    }
  }
  
  export default SideList;