import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Grid } from "@material-ui/core";

function ProfileUser() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <img src="https://placekitten.com/600/600" alt="Kitten!" />
        </Grid>
        <Grid item md={7}>
          <Typography>User Name Goes Here</Typography>
        </Grid>
        <Grid item md={2}>
          <Button
            component={Link}
            to="/profile/edit">Edit Profile</Button>
        </Grid>
      </Grid>
      <Typography>User Email</Typography>
    </div>
  );
}

export default ProfileUser;