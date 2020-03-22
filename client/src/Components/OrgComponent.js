import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemAvatar, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlaceholderIcon from "@material-ui/icons/Person"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));
// Expected props is an object
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
          primary={props.organization.name}
          secondary={props.organization.description} />
        <Button
          component={Link}
          to={`/organization/${props._id}`}
          ></Button>
      </ListItem>
    );
  }
  
  export default OrgComponent;