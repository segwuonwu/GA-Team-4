import React from "react";
import { Link } from "react-router-dom";
import "../scss/App.scss";
import logo_img from "../assets/giveback_logo.png";

function Logo(props) {

  return (
    <div>
        <Link to={props.link}>
          <img src={logo_img} className="logo" alt="logo" />
        </Link>
    </div>
  );
}

export default Logo;