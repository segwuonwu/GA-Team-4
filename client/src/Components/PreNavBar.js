import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Logout from './LogNavBar'

import Logo from "./Logo";

function PreNavBar(props) {
  
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

  // // If the user is logged in, show profile page and logout links
  if (props.user) {
    links = (
        <Logout />
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