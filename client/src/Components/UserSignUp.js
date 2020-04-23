import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import volunteerImg from "../assets/gardening.jpg";

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '90vh',
    },
    image: {
      backgroundImage: `url(${volunteerImg})`,
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
    form: {
      width: '100%', 
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    topRow: {
      justifyContent: "space-between"
    },
    topFields: {
      maxWidth: "47.9%",
      flexBasis: "48.9%"
    },
    spacing: {
      margin: "0.25em"
    }
  }));

const SignUp = props => {
    const classes = useStyles()
    // Declare and initialize state variables
    let [firstname, setFirstname] = useState('')
    let [lastname, setLastname] = useState('')
    let [email, setEmail] = useState('')
    let [message, setMessage] = useState('')
    let [password, setPassword] = useState('')
    
  //  const classes = useStyles()
  
    useEffect(()=>{
      setMessage('')   
    }, [firstname, lastname, email, password])
  
    const handleSubmit = e => {
      e.preventDefault()
      fetch(`/auth/signup`,{
        method: 'POST',
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .then(response => {
         if (!response.ok){
           setMessage(response.statusText)
           return;
         }
  
         response.json().then(result => {
          props.updateUser(result.token);
        })
       })
      .catch(err => {
        console.log(err);
        setMessage(`${err.toString()}`);
      })
  
    }
    if (props.user) {
      return <Redirect to="/home" />
    }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={3} md={6} className={classes.image} />
      <Grid item xs={12} sm={9} md={6} elevation={6} square>
      <div className={`${classes.paper}`}>     
        <Typography component="h1" variant="h4" gutterBottom>
         <br></br> New User Registration
        </Typography>
        <span className="red">{message}</span>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container className={classes.topRow}>
            <Grid item xs={12} sm={5} className={`${classes.spacing} ${classes.topFields}`}>
              <TextField
                name="firstname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={5} className={`${classes.spacing} ${classes.topFields}`}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={e => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}  className={classes.spacing}>
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
            <Grid item xs={12}  className={classes.spacing}>
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
            Get Volunteering!
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        </div>
      </Grid>
    </Grid>
   
  );
};

export default SignUp;