import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/SignupUser";

function Content() {
  return(
    <Switch>
      <Route path="" exact={true} component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}

export default Content;