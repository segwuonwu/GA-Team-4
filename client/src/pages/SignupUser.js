import React from "react";
import { Redirect } from "react-router-dom";
import UserSignUp from "../Components/UserSignUp";


function SignupUser(props) {

  if (props.user) {
    return <Redirect to="/home" />
  }

  return (
    <div>
      <UserSignUp user={props.user} updateUser={props.updateUser}/>
    </div>
  );
}

export default SignupUser;
