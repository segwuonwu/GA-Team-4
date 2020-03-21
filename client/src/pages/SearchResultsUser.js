import React from "react";
import { Typography } from "@material-ui/core";
import SearchResList from "../Components/SearchResList";
import { useLocation } from "react-router-dom";


function SearchResultsUser() {

// Will get the query from the URL: https://codesandbox.io/s/react-router-query-parameters-mfh8p?from-embed
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery().get("query");
  componentDidMount() {
    fetch("https://codesandbox.io/s/react-router-query-parameters-mfh8p?from-embed")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  return (
    <div>
      <Typography>Search Result for {query}</Typography>
      <SearchList items={[]} resultType={query} />
    </div>
  );
}

export default SearchResultsUser;