import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    color: theme.palette.primary.dark,
    fontWeight: "bold"
  }, 
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function EditProfile(props) {

  const classes = useStyles();

  const [firstname, setFirstname] = useState(props.user ? props.user.firstname : "");
  const [lastname, setLastname] = useState(props.user ? props.user.lastname : "");
  const [email, setEmail] = useState(props.user ? props.user.email : "");
  const [profileUrl, setProfileUrl] = useState(props.user ? props.user.image : "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("")
  }, [firstname, lastname, email, profileUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("", {
      method: "PUT",
      body: JSON.stringify({
        firstname, 
        lastname,
        email, 
        profileUrl
      }),
      headers: {
        Authorization: `Bearer ${localStorage.mernToken}`
      }
    }).then(response => {
      if (!response.ok) {
        setMessage(response.statusText);
        return;
      }
      return response.json();
    }).then(user => {
      console.log(user);
    }).catch(err => {
      setMessage(err);
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.header}>
          Edit profile
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="image"
                label="Profile Url"
                type="url"
                id="image"
                value={profileUrl}
                onChange={e => setProfileUrl(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Confirm Changes
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default EditProfile;