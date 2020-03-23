import React from 'react';
import { Container, Grid, Typography, Link } from "@material-ui/core";


//Github
//Copyright
function Footer() {
    return (
      <footer className="footer">
        <Container maxWidth="lg">
          <Grid container>
            <Grid item md={6}>
              <Typography 
                variant="subtitle2">
                  Copyright © 2020, Melissa Young, Solomon Egwuonwu, Shawhien Sohrabi, Dylan Lewis
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Link href="https://github.com/melissay94/GA-Team-4" className="footer-link">GitHub Repo</Link>
            </Grid>
          </Grid>
        </Container>
      </footer>
    );
  }
  
  export default Footer;