import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Login(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // setMessage to erroe if not authenticate
      .then(response => {
        if (!response.ok) {
          setMessage(`${response.status}: ${response.statusText}`)
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
    return <Redirect to="/profile" />
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Welcome Back
        </Typography>
        <span className="red">{message}</span>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        {/* <form className={classes.form} > */}
          <Grid container spacing={2}>
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
        </form>
      </div>
      
    </Container>
  );
}

export default Login;