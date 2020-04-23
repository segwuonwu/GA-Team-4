import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OrgHomeItem from "./OrgHomeItem";

const useStyles = makeStyles(theme =>({

  root: {
    padding: "1.5em 1em 2em 2em"
  },
  header: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    marginTop: "1em",
    marginLeft: "1em"
  }
}));

function OrgList(props) {
  const classes = useStyles();

  return(
    <div>
      <Typography
        variant="h4"
        className={classes.header}>
        Affiliated Organizations
      </Typography>
      <Grid container className={classes.root}>{
        props.organizations.map((item, index) => {
          return <OrgHomeItem organization={item} key={index} />
        })
      }</Grid>
    </div>
  );
}
export default OrgList;