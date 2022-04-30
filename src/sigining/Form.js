import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box'

import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import { fontSize } from "@mui/system";

export default function Form({handleClose, handleSave, open, handleClickOpen}) {
    // {title, setEmail, setPassword, handleData}


  const [login, setLogin] = useState({
    email:'', password:''
  });

  const inputChange = (event) => {
    setLogin({...login, [event.target.name]:event.target.value})
  }

  return (
    <Box component="form">
     <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Make account with email</DialogTitle>
        <DialogContent>

          <TextField
            margin="dense"
            name="email"
            label="email"
            value={login.email}
            onChange={inputChange}
            fullWidth
            variant="standard"

          />
          <TextField
            margin="dense"
            name="password"
            value={login.password}
            onChange={inputChange}
            label="password"
            fullWidth
            variant="standard"
          />
              
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSave(login)}>Save</Button>
        </DialogActions>
        
      </Dialog>
      <IconButton variant="outlined" onClick={handleClickOpen} style={{marginTop:50, fontSize:20}}>
        <AddIcon />
        <div>Create new account with email</div>
      </IconButton>

    </Box>
  );
}
