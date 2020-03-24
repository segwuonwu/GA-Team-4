import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Typography, Button, Grid, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "55%",
    margin: "2em auto",
    display: "flex",
    flexWrap: "wrap",
  }, 
  profileInfo: {
    width: "65%",
    margin: "1em 0 0 2.5em"
  }, 
  header: {
    color: theme.palette.primary.dark,
    fontWeight: "bold"
  }, 
  float: {
    float: "right",
    marginRight: "1.5em"
  }
}))

function ProfileUser(props) {

  const classes = useStyles();

  setTimeout(() => {
    if (!props.user) {
      return <Redirect to='/' />
    }
  }, 5000);
  
  return (
    <Paper className={classes.root}>
      <img src={props.user ? props.user.image : "https://placekitten.com/200/200"} alt="User Profile Picture" />
      <Grid container className={classes.profileInfo}>
        <Grid item md={7} lg={7}>
          <Typography
            variant="h5"
            className={classes.header}>{props.user ? props.user.firstname + " " + props.user.lastname : "User Name"}</Typography>
        </Grid>
        <Grid item md={5} lg={5}>
          <Button
            component={Link}
            className={classes.float}
            variant="contained"
            color="secondary"
            to="/profile/edit">Edit Profile</Button>
        </Grid>
        <Grid item md={12}>
          <Typography
            variant="subtitle2">Email: {props.user ? props.user.email : "User email"}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography 
            variant="subtitle2">
              Following {props.user ? props.user.organizations.length : "0"} organizations
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography
              variant="subtitle2"
              className={classes.float}>
                Attended {props.user ? props.user.events.length : "0"} events
            </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ProfileUser;