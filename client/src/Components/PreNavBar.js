import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

//Logo
//Sign In
//Sign Up Userimport React from 'react';
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