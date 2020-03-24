import React, {useEffect, useState} from "react";
import { Redirect } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SearchResList from "../Components/SearchResList";
import { useLocation } from "react-router-dom";

function SearchResultsUser(props) {

  const [results, setResults] = useState(null);  
  const [error, setError] = useState(null);
  const useQuery = () => {
      return new URLSearchParams(useLocation().search);
  }
  const query = useQuery().get("query");
//"https://codesandbox.io/s/react-router-query-parameters-mfh8p?from-embed"
  useEffect(()=>{
    console.log(query);
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

  console.log(results);

  return (
    <div>
      <Typography>Search Result for {query}</Typography>
      { error ? 
        <div>{error}</div> : 
        <SearchResList items={ results ? results : [] } resultType={query} /> 
      }
    </div>
  )
}

export default SearchResultsUser;