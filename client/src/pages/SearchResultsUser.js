import React, {useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchResList from "../Components/SearchResList";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  header: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    width: "40%,",
    margin: "1em 0 0 28%",
  },
  query: {
    color: theme.palette.secondary.dark,
    fontWeight: "bold"
  }
}))

function SearchResultsUser(props) {

  const classes = useStyles();

  const [results, setResults] = useState(null);  
  const [error, setError] = useState(null);
  const useQuery = () => {
      return new URLSearchParams(useLocation().search);
  }
  const query = useQuery().get("query");
  useEffect(()=>{
    switch(query) {
      case "events":
      case "event":
        fetch(`${process.env.REACT_APP_SERVER_URL}/events`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.mernToken}`
          }
        })
          .then(response => {
            if (!response.ok) {
              setError ("Unable to connect to database");
              return;
            } 
            console.log(response);
            return response.json();
          }).then(events => {
            setResults(events);
          }).catch(err => {
            setError("Unable to retrieve results from database")
            console.log(err);
          })
        break;
      case "organizations":
      case "organization":
        fetch(`${process.env.REACT_APP_SERVER_URL}/organizations`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.mernToken}`
          }
        })
          .then(response => {
            if (!response.ok) {
              setError ("Unable to connect to database");
              return;
            } return response.json();
          }).then(organizations => {
            setResults(organizations);
          }).catch(err => {
            setError("Unable to retrieve results from database")
            console.log(err);
          })
        break;
      default:
        setError("No results found");
    }
  },[query]);

  setTimeout(() => {
    if (!props.user) {
      return <Redirect to='/' />
    }
  }, 5000);

  return (
    <div>
      <Typography 
        variant="h3"
        className={classes.header}>Search Result for 
        <span className={classes.query}> {query}</span>
      </Typography>
      { error ? 
        <div>{error}</div> : 
        <SearchResList items={ results ? results : [] } resultType={query} /> 
      }
    </div>
  )
}

export default SearchResultsUser;