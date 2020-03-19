import React from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, fade, InputBase, IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  search:{
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "10px",
    paddingLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.6)"
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: "0.8em"
  }
}));

function Searchbar() {
  const classes = useStyles();

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search..."
        classes={classes.input} 
        inputProps={{
          "aria-label": "search give back" 
        }}/>
        <IconButton className={classes.searchIcon} aria-label="search">
          <SearchIcon />
        </IconButton>
    </div>
  );
}
  
export default Searchbar;