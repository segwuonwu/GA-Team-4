import React from "react";
import { Typography } from "@material-ui/core";

function ErrorMessage(props) {
  return(
    <div>
      <Typography>{props.error}</Typography>
    </div>
  );
}

export default ErrorMessage;