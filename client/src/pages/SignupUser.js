import React from "react";
import UserSignUp from "../Components/UserSignUp";


function SignupUser(props) {
  return (
    <div>
      <UserSignUp user={props.user} updateUser={props.updateUser}/>
    </div>
  );
}

export default SignupUser;

// https://material-ui.com/components/app-bar/
// https://material-ui.com/getting-started/templates/