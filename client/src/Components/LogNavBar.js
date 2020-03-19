import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import Searchbar from "./Searchbar";
import Logo from "./Logo";

function LogNavBar() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Logo link="/home" />
          <Searchbar />
          <Button
            color="inherit"
            component={Link}
            to="/profile">Profile</Button>
          <Button
            color="inherit"
            component={Link}
            to="/">Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default LogNavBar;

