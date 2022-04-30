import React, { useState, useEffect } from "react";

import { initializeApp, getApps, getApp } from "firebase/app";
import "firebase/auth";

import Snackbar from "@mui/material/Snackbar";

import { getDatabase, push, ref, onValue, remove } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Calendar from "./Calendar.js";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API_KEY,
  authDomain: process.env.REACT_APP_DB_API_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_API_URL,
  projectId: process.env.REACT_APP_DB_PROJECTID,
  storageBucket: "calendar-f4d92.appspot.com",
  messagingSenderId: "245595619411",
  appId: process.env.REACT_APP_DB_APPID,
};

let app = null;
// Initialize Firebase
getApps().length === 0
  ? (app = initializeApp(firebaseConfig))
  : (app = getApp());
//const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function Firebase() {
  const [events, setEvents] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  let userId = "";
  const [user, setUser] = useState(null);
  // Your web app's Firebase configuration

  // Initialize Firebase

  const saveEvent = (event) => {
    push(ref(database, "events/"), {
      Event: event,
      id: getAuth(app).currentUser.uid,
    });
    setMessage("Saved");
    setOpen(true);
  };

  const deleteEvent = (id) => {
    remove(ref(database, "events/" + id))
      .then(() => {
        setMessage("Event deleted");
        setOpen(true);
      })
      .catch((err) => {
        alert("(" + err + ") Something went wrong");
      });
  };

  const logOut = () => {
    setUser(null);
    userId = "";
  };

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userId = user.uid;
      }
    });
    if (getAuth(app).currentUser) {
      userId = getAuth(app).currentUser.uid;
      setUser(getAuth(app).currentUser.uid);
    }

    const itemsRef = ref(database, "events/");

    onValue(itemsRef, (snapshot) => {
      let list = [];
      snapshot.forEach((child) => {
        if (child.val().id === userId || child.val().id === user) {
          list.push({
            key: child.key,
            body: child.val(),
          });
        }
      });
      setEvents({ values: list });
    });
  }, []);

  if (!events) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return (
    <div>
      <Calendar
        saveEvent={saveEvent}
        deleteEvent={deleteEvent}
        logOut={logOut}
        events={events.values}
      />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message={message}
      />
    </div>
  );
}

export default Firebase;
export const auth = getAuth(app);
