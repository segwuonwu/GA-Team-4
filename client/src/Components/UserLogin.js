import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import handsImg from "../assets/hands.jpg";



function Login(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '90vh', 
    },
    image: {
      backgroundImage: `url(${handsImg})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    },
    paper: {
      marginTop: theme.spacing(8,4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '80%', 
      marginTop: theme.spacing(3),
      padding: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    topFields: {
      maxWidth: "48.9%",
      flexBasis: "48.9%"
    },
    spacing: {
      margin: "0.25em"
    }
  }));
  
  const classes = useStyles()

  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')

  useEffect(() => {
    setMessage('');
  }, [email, password])

  // Event handlers
  const handleSubmit = e => {
    e.preventDefault()
    // make a fetch request to get route of the server to check for authentication
    fetch(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
      .then(response => {
        if (!response.ok) {
          setMessage(response.statusText)
          return;
        }

        response.json().then(result => {
          props.updateUser(result.token);
        })
      }).catch(err => {
        console.log(err);
        setMessage(`${err.toString()}`)
    })
  }

  // if authenticated we are updateUser + redirect to profile
  if (props.user) {
    return <Redirect to="/home" />
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={3} md={6} className={classes.image} />
      <Grid item xs={12} sm={9} md={6} elevation={6}>
      <div className={`${classes.paper}`}>
        <Typography component="h1" variant="h3" gutterBottom>
          Returning User
        </Typography>
        <Typography variant="h6">
          Welcome Back
        </Typography>
        <span className="red">{message}</span>
        <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container className={classes.topRow}>
            <Grid item xs={12}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={e => setEmail(e.target.value)}
              />
              </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
    </Grid>
  );
}

export default Login;


//https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js
