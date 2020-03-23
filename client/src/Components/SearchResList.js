import React from 'react';
import { List } from "@material-ui/core/";
import EventItem from "../Components/EventComponent";
import OrganizationItem from "../Components/OrgComponent";

//lists results of search 
//ability to click on an event  to be added to user

function SearchResList(props) {

  switch(props.resultType) {
    case "event":
    case "events":
      return(
        <List>
          {props.items.map((item, index) => {
            return <EventItem event={item} key={index} />
          })}
        </List>
      );
    case "organization":
    case "organizations":
      return(
        <List>
          {props.items.map((item, index) => {
            return <OrganizationItem organization={item} key={index} />
          })}
        </List>
      )
    default:
      return(
        <div>
          <h3>No Results</h3>
        </div>
      );
  }
}
  
export default SearchResList;