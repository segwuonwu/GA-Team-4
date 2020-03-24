import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Typography, Button, Grid, Paper } from "@material-ui/core";

function ProfileUser(props) {

  setTimeout(() => {
    if (!props.user) {
      return <Redirect to='/' />
    }
  }, 5000);
  
  return (
    <div>
      <Grid container spacing={2} component={Paper}>
        <Grid item md={2}>
          <img src={props.user ? props.user.image : "https://placekitten.com/200/200"} alt="User Profile Picture" />
        </Grid>
        <Grid item md={7}>
          <Typography>{props.user ? props.user.firstname + " " + props.user.lastname : "User Name"}</Typography>
        </Grid>
        <Grid item md={2}>
          <Button
            component={Link}
            to="/profile/edit">Edit Profile</Button>
        </Grid>
      </Grid>
      <Typography>{props.user ? props.user.email : "User email"}</Typography>
    </div>
  );
}

export default ProfileUser;