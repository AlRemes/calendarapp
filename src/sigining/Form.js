import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Buttons from "./Button.js";
import { Button } from "@mui/material";

import { useLocation } from "react-router-dom";


export default function Form(props) {
    // {title, setEmail, setPassword, handleData}

    let location = useLocation();
  console.log(location);

  return (
    <Box component="form">
      {/* <h1>{title} form</h1> */}
      <Box>
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          value={props.email}
          onChange={(event) => {
            props.setEmail(event.target.value);
          }}
        />
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          placeholder="Password..."
        //   value={password}
          onChange={(event) => {
            // setPassword(event.target.value);
          }}
        />
      </Box>
      <Button onClick={_=> console.log(props.location.state)}>Test</Button>
      {/* <Buttons  title={title} handleData={handleData}/> */}
    </Box>
  );
}
