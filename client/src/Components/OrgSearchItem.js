import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemAvatar, Avatar, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlaceholderIcon from "@material-ui/icons/Person";

const useStyles = makeStyles(theme => ({
  root: {
    width: "45%",
    margin: "1.5em auto"
  },
}));

// Expected props is an object
function OrgComponent(props) {
  const classes = useStyles();
  
    return (
      <Paper className={classes.root}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              {props.organization.image? <img src={props.organization.image} /> : <PlaceholderIcon />}
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primary={props.organization.orgname ? props.organization.orgname : "Org name"}
            secondary={props.organization.email ? props.organization.email : "Org email"} />
          <Button
            component={Link}
            to={`/organization/${props.organization._id}`}>
              Show More
          </Button>
        </ListItem>
      </Paper>
    );
  }
  
  export default OrgComponent;