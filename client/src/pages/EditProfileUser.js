import React from "react";
import { Redirect } from "react-router-dom";
import EditProfile from '../Components/EditProfile';

function EditProfileUser(props) {

  setTimeout(() => {
    if (!props.user) {
      return <Redirect to='/' />
    }
  }, 5000);

  return (
    <div>
      <EditProfile user={props.user ? props.user : null} />
    </div>
  );
}

export default EditProfileUser;