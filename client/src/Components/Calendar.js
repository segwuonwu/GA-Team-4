import React, { useState } from 'react';
import {  Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";
import { useTheme } from "@material-ui/core/styles/"

const localizer = momentLocalizer(moment);

function Calendar(props) {

  const theme = useTheme();

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {
      backgroundColor: theme.palette.secondary.main
    }
    return {
      style: style
    }
  }

  const convertEvents = () => {
    if (props.events) {
      return props.events.map(event => {
        return {
          "title": event.eventname,
          "start": moment(event.eventdate).toDate(),
          "end": moment(event.eventdate).toDate(),
          "allDay": true
        }
      });
    } else {
      return [];
    }
  }

    return (
      <div>
        <BigCalendar 
            className="calendar"
            localizer={localizer}
            events={convertEvents()}
            eventPropGetter={eventStyleGetter}/>
      </div>
    );
  }
  
export default Calendar;