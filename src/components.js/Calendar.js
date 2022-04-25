import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

import moment from "moment";
import { display } from "@mui/system";
import NewEvent from "./NewEvent.js";
import Display from "./Display.js";

function Calendar(props) {
  const [event, setEvent] = useState({
    importance: "",
    date: "",
    time: "",
    description: "",
  });

  function eventDetails() {
    let filterEvent = [];
    let filteredEvents = [];
    let color = '';
    Object.values(props.events).map((item, i) => {

        let start = new Date(item.body.Event.date + ',' + item.body.Event.time)
        if (item.body.Event.importance==='low'){
          color='green'
        }
        if (item.body.Event.importance==='medium'){
          color='orange'
        }
        if (item.body.Event.importance==='high') {
          color='red'
        }
      filterEvent = {
        id: item.key,
        title: item.body.Event.description,
        start: start,
        color:color,
      };
      filteredEvents.push(filterEvent);
    });
    return filteredEvents;


  }

  const [open, setOpen] = useState(false);

  const [openDisplay, setOpenDisplay] = useState(false)
  const [detail, setDetail] = useState();

  const handleCloseDisplay = () => {
    setOpenDisplay(false);
  };

  const handleDelete = () => {
    setOpenDisplay(false);
  }

  const handleSave = () => {
    props.saveEvent(event);
    setOpen(false);
    setEvent({
      importance: "",
      date: "",
      time: "",
      description: "",
    })
  };

  const handleClose = () => {
    setOpen(false);
    setEvent({
      importance: "",
      date: "",
      time: "",
      description: "",
    })
  };

  const inputChange = (value) => {
    setEvent({ ...event, [value.target.name]: value.target.value });
  };

  const importance = ["low", "medium", "high"];

  const time = {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: 'short'
  }

  const display = (info) => {
    setDetail(info)
    setOpenDisplay(true)
  }
  

  if (!props.events) {
    return (
      <div>
        <h1>Loading..</h1>
      </div>
    );
  } else {
    return (
      <div className="App" style={{ flex: 1 }}>
        <FullCalendar
          customButtons={{
            add: {
              text: "Add event",
              click: () => setOpen(true),
            },
          }}
          eventDisplay="block"
          displayEventTime="true"
          displayEventEnd="true"
          height={500}
          contentHeight={500}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
          headerToolbar={{ center: "dayGridMonth,dayGridWeek,dayGridDay add" }}
          events={eventDetails()}
          eventTimeFormat={time}
          eventClick={
            function(arg){
              display(arg.event)
            }
          }
        />

          <NewEvent open={open} handleClose={handleClose}
          event={event} inputChange={inputChange} 
          importance={importance} handleSave={handleSave}
          />
          <Display open={openDisplay} handleClose={handleCloseDisplay}
          event={event} handleDelete={handleDelete} detail={detail}/>
      </div>
    );
  }
}

export default Calendar;
