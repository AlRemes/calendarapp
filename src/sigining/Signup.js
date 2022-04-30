import React, { useState, useEffect } from "react";

import { auth } from "../components.js/Firebase.js";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from "firebase/auth";
import { Button } from "@mui/material";

import Form from "./Form.js";
import { width } from "@mui/system";

let user = "";

const Signup = (props) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const move = () => {
    navigate("/calendar", { replace: true });
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        user = re.user.email;
        move();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signInWithGithub = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((re) => {
        user = re.user.email;
        move();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = (login) => {
    if (login.email.includes(".") && login.email.includes("@")) {
      createUserWithEmailAndPassword(auth, login.email, login.password)
        .then((re) => {
          user = re.user.email;
          alert("Account made");
          setOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Not a valid email");
    }
  };

  const signInEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (userCredential) {
          move();
        } else {
          alert("Something went wrong. Are your login details correct?");
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <h3 style={{ color: "grey" }}>Hello! Create account or login</h3>
          <Box style={{border: 2, borderStyle:'solid', borderColor:'grey', margin:5, borderRadius:15, width:'110%'}}>
            <Box style={{marginLeft:'15%', alignContent:'center', alignItems:'center'}}>
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
            <Box style={{marginLeft:'15%', alignContent:'center', alignItems:'center'}}>
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
            <IconButton variant="outlined" onClick={signInEmail} style={{marginLeft:'10%', marginTop:'5%', alignContent:'center', alignItems:'center'}}>
              <EmailIcon />
              <div style={{ fontSize: "70%" }}> Login with Email account</div>
            </IconButton>
          </Box>
          <Box style={{marginLeft:'40%', alignContent:'center', alignItems:'center'}}>
            <IconButton variant="outlined" onClick={signInWithGoogle}>
              <GoogleIcon />
            </IconButton>
            <IconButton variant="outlined" onClick={signInWithGoogle}>
              <GitHubIcon />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Form
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
            open={open}
            handleSave={handleSave}
          />
        </Box>
      </Box>
    </>
  );
};

export default Signup;

export const userDetails = user;
