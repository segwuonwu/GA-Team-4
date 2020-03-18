import React from "react";
import {
  BrowserRouter as Router,
  Link 
} from "react-router-dom";
import "../scss/App.scss";
import logo_img from "../assets/giveback_logo.png";

function Logo(props) {

  return (
    <div>
      <Router>
        <img src={logo_img} className="logo" alt="logo" />
        <Link to={props.link} />
      </Router>
    </div>
  );
}

export default Logo;