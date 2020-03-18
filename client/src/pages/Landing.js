import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import PreNavBar from "../Components/PreNavBar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";


const useStyles = makeStyles(theme => ({

}));
function Landing() {
  return (
    <div>

    <PreNavBar />
    <Hero />
    <Footer />

    </div>
  );
}

export default Landing;