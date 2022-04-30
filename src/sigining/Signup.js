import React, { useState, useEffect } from "react";

import { auth } from "../components.js/Firebase.js";


import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import {Link, useNavigate} from"react-router-dom";

import Firebase from "../components.js/Firebase.js";


import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { Button } from "@mui/material";

let user = '';

const Signup = (props) => {

  const navigate = useNavigate()

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const move = () =>{
  navigate('/calendar', { replace: true })
}

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((re) => {
    user = re.user.email
    console.log(re)
  })
  .catch((err) => {
    console.log(err)
  })
}

const createEmailAcc = () => {
  if (email.includes('.') && email.includes('@')){
  createUserWithEmailAndPassword(auth, email, password)
  .then((re) => {
    user = re.user.email

    console.log(re)
  })
  .catch((err) => {
    console.log(err)
  })
} else{
  alert('Not a valid email')
}
}

const signInEmail = () => {
signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }



const handleData = (id) => {

}

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>    
    <Box>
    <Box>
        <TextField
          id="standard-basic"
          label="email"
          variant="standard"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </Box>
      <Box>
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          placeholder="Password..."
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </Box>
    <Button
    variant="outlined" onClick={signInWithGoogle} style={{marginTop:10}}>
        Sign in with Google
    </Button>
    <Button
    variant="outlined" onClick={createEmailAcc} style={{marginTop:10}}>
        Create Email account
    </Button>
    <Button
    variant="outlined" onClick={signInEmail} style={{marginTop:10}}>
        Sign in with Email account
    </Button>
    <Button
    variant="outlined" onClick={signOut} style={{marginTop:10}}>
        Sign out
    </Button>
    <Button
    variant="outlined" onClick={move} style={{marginTop:10}}>
        To calendar
    </Button>

    </Box>
    </>
  );
};

export default Signup;

export const userDetails = user;
