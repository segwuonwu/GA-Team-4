import React from "react";
import { Redirect } from "react-router-dom";
import Hero from "../Components/Hero";

function Landing(props) {

  if (props.user) {
    return <Redirect to="/home" />
  }
  
  return (
    <div>
      <Hero />
    </div>
  );
}

export default Landing;