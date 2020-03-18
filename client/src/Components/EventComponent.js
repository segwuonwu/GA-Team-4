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

    return (
      <ListItem>
        <ListItemText 
          primary={props.event.name}
          secondary={props.event.dateTime}
        />
      </ListItem>
    );
  }
  
  export default EventComponent;