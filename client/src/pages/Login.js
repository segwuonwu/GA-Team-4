import React from "react";
import { Redirect } from "react-router-dom";
import UserLogin from "../Components/UserLogin";

function userLogin(props) {

  if (props.user) {
    return <Redirect to="/home" />
  }
  
  return (
    <div>
      <UserLogin user={props.user} updateUser={props.updateUser}/>
    </div>
  );
}

export default userLogin;