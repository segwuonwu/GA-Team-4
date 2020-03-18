import React from 'react';
import {
  Link,
  Route,
  Switch
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Logo from "./Logo";
import Login from "../pages/Login";
import Signup from "../pages/SignupUser";
import Landing from "../pages/Landing";

function PreNavBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Logo link="/" />
          <Button 
            color="inherit"
            component={Link}
            to="/login">Login</Button>
          <Button 
            color="inherit"
            component={Link}
            path="/signup">Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default PreNavBar;