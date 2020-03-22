import React from "react";
import UserLogin from "../Components/UserLogin";

function userLogin(props) {
  
  return (
    <div>
      <UserLogin user={props.user} updateUser={props.updateUser}/>
    </div>
  );
}

export default userLogin;