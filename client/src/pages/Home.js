import React from "react";
import { Typography } from "@material-ui/core";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/sass/styles.scss";
import moment from "moment";
import LogNavBar from "../Components/LogNavBar";
import Footer from "../Components/Footer";

const localizer = momentLocalizer(moment);

function Home() {
  return (
    <div>
      <LogNavBar />
      <Typography>
        Hello User!
      </Typography>
      <Calendar 
        className="calendar"
        localizer={localizer}
        events={[]} />
      <Footer />
    </div>
  );
}

export default Home;