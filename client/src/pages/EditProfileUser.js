import React from "react";
import EditProfile from '../Components/EditProfile';

function EditProfileUser(props) {
  return (
    <div>
      <EditProfile user={props.user ? props.user : null} />
    </div>
  );
}

export default EditProfileUser;