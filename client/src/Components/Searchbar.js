import React from 'react';
import { useState } from "react";
import { Redirect } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, fade, InputBase, IconButton } from '@material-ui/core';
import useSearch from "../hooks/SearchHook";

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
  const [query, setQuery] = useState(null);

  const sendSearchQuery = () => {
    console.log("Hello", input);
    setQuery(input);
  }
  
  const {input, handleInputChange, handleSubmit} = useSearch(sendSearchQuery);

  if (query) return <Redirect to={`/search/?query=${input}`} />;

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search..."
        value={input}
        onChange={handleInputChange}
        className={classes.input} 
        inputProps={{
          "aria-label": "search give back" 
        }}/>
        <IconButton 
          className={classes.searchIcon} 
          aria-label="search"
          onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
    </div>
  );
}
  
export default Searchbar;