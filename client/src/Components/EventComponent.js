import React from 'react';
import { ListItem, ListItemText} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function EventComponent(props) {
  const classes = useStyles();

  const addEvent = () => {
  console.log("Clicked")
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/events/${props.event.id}`, {
      method: 'POST',
      body: {
        test: 'test'
      }
    }).then(response => response.json()).then(result => {
      console.log('all good')
    }).catch(err=>console.log(err))
  }

    return (
      <ListItem>
        <button onClick={addEvent}>Test Button</button>
        <ListItemText 
          primary={props.event.name}
          secondary={props.event.dateTime}
        />
      </ListItem>
    );
  }
  
  export default EventComponent;