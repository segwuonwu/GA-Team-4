import React, { useState } from 'react';
import {  Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";

const localizer = momentLocalizer(moment);

function Calendar(props) {

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
            events={convertEvents()}/>
      </div>
    );
  }
  
export default Calendar;