import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Logout from './LogNavBar'

import Logo from "./Logo";

function PreNavBar(props) {
  const handleLogout = e => {
    e.preventDefault()
    // Remove the token from localstorage 
    localStorage.removeItem('mernToken')

    // Update the state of the App
    props.updateUser();
  }

  let links = (
    <span>
        <Toolbar>
          <Button 
            color="inherit"
            component={Link}
            to="/login">Login</Button>
          <Button 
            color="inherit"
            component={Link}
            to="/signup">Sign Up</Button>
        </Toolbar>
    
    </span>
  )

  // If the user is logged in, show profile page and logout links
  if (props.user) {
    links = (
      <span>
        <li>
        <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Logout onClick={handleLogout}/>
        </li>
      </span>
    )
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <li>
            <Logo link="/" />
          </li>
          {links}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default PreNavBar;