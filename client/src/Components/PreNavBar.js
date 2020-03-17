import React from 'react';
import { AppBar } from '@material-ui/core';

//Logo
//Sign In
//Sign Up User
//Sign Up Org
function PreNavBar() {
    return (
      <div>
       <AppBar position="static">
         <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                GiveBack
              </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
      </Toolbar>
    </AppBar>

      </div>
    );
  }
  
  export default PreNavBar;