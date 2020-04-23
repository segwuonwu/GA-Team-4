import React from "react";
import { Link, Redirect } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Searchbar from "./Searchbar";
import Logo from "./Logo";

function LogNavBar(props) {
  const handleLogout = e => {
    e.preventDefault()
    // Remove the token from localstorage 
    localStorage.removeItem('mernToken')
    // Update the state of the App
    props.updateUser();
  }

    return (
      <AppBar position="static">
        <Toolbar>
          <Logo link="/" />
          <Searchbar />
          <Button
            color="inherit"
            component={Link}
            to="/profile">Profile</Button>
          <Button
            color="inherit"
            component={Link}
            to="/" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default LogNavBar;