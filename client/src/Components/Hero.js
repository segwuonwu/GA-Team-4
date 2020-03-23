import React from 'react';
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

function Hero() {
    return (
      <div className="hero">
        <div className="info">
          <Typography
            variant="h1">
              Welcome to GiveBack
          </Typography>
          <Typography
            variant="h4">
              Connecting volunteers with their communities
          </Typography>
          <Button
            className="btn"
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/signup"
            >
              Join Now!
          </Button>
        </div>
      </div>
    );
  }
  
  export default Hero;