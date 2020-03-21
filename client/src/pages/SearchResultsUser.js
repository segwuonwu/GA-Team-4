import React, {useEffect, useState} from "react";
import { Typography } from "@material-ui/core";
import SearchResList from "../Components/SearchResList";
import { useLocation } from "react-router-dom";

function SearchResultsUser() {

const [results, setResults] = useState(null);  
const [error, setError] = useState(null);
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

//"https://codesandbox.io/s/react-router-query-parameters-mfh8p?from-embed"
  useEffect(()=>{
      fetch(events)
        .then(response => {
          if (!response.ok) {
            setError ("Sorry something went wrong");
            return;
          } return response.json();
        }).then(events => {
          setState(events);
        }).catch(err => {
          setError("Can't find any Events")
          console.log(err);
        })
 
    fetch(orginizations)
    .then(response => {
      if (!response.ok) {
        setError ("Oopsie Poos");
        return;
      } return response.json();
    }).then(orginizations => {
      setState(orginizations);
    }).catch(err => {
      setError("Cant find the Org you're looking for")
      console.log(err);
    })
  },[]);

  }

  return (
    <div>
      <Typography>Search Result for {query}</Typography>
      <SearchList items={[]} resultType={query} />
    </div>
  )
}

export default SearchResultsUser;