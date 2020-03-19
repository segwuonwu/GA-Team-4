import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/SignupUser";
import Home from "../pages/Home";
import Profile from "../pages/ProfileUser";
import SearchResults from "../pages/SearchResultsUser";

function Content() {
  return(
    <Switch>
      <Route path="" exact={true} component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/search" component={SearchResults} />
    </Switch>
  );
}

export default Content;