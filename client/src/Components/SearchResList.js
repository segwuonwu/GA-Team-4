import React from 'react';
import { List } from "@material-ui/core/";
import EventSearchItem from "./EventSearchItem";
import OrgSearchItem from "./OrgSearchItem";

//lists results of search 
//ability to click on an event  to be added to user

function SearchResList(props) {

  switch(props.resultType) {
    case "event":
    case "events":
      return(
        <List>
          {props.items.map((item, index) => {
            return <EventSearchItem event={item} key={index} />
          })}
        </List>
      );
    case "organization":
    case "organizations":
      return(
        <List>
          {props.items.map((item, index) => {
            return <OrgSearchItem organization={item} key={index} />
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