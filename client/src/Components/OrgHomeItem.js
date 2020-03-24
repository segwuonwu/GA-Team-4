import React from "react";
import { Grid, Card, CardMedia, CardContent, CardActionArea, CardActions, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "60%"
  },
  cardArea: {
    padding: "0.75em"
  }
}))

function OrgHomeItem(props) { 
  const classes = useStyles();

  return(
    <Grid item md={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia 
            component="img"
            height="150"
            src={props.organization.image ? props.organization.image : "http://www.placecage.com/200/200"}
            alt="Profile" />
          <CardContent className={classes.cardArea}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2">
                {props.organization.orgname ? props.organization.orgname : "Org Name"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p">
                {props.organization.email ? props.organization.email : "Org Contact Info"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              color="secondary" 
              variant="contained" 
              component={Link}
              to={`organizations/${props.organization._id}`}>
                See More
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default OrgHomeItem;