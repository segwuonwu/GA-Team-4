import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Searchbar from "./Searchbar";

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
          <Searchbar />
          <Button
            color="inherit"
            component={Link}
            to="/home">Profile</Button>
          <Button
            color="inherit"
            component={Link}
            to="/" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default LogNavBar;

