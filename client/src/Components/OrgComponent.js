import React from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlaceholderIcon from "@material-ui/icons/Person"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function OrgComponent(props) {
  const classes = useStyles();
    return (
      <ListItem className={classes.root}>
        <ListItemAvatar>
          <Avatar>
            <PlaceholderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText 
          primary={props.name}
          secondary={props.description} />
      </ListItem>
    );
  }
  
  export default OrgComponent;