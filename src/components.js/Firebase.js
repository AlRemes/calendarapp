import React, { useState, useEffect } from "react";

import { initializeApp, getApps, getApp } from "firebase/app";


import { getDatabase, push, ref, onValue } from'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import Calendar from "./Calendar.js";

function Firebase(){

    const [events, setEvents] = useState();
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_DB_API_KEY,
  authDomain: process.env.REACT_APP_DB_API_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_API_URL,
  projectId: process.env.REACT_APP_DB_PROJECTID,
  storageBucket: "calendar-f4d92.appspot.com",
  messagingSenderId: "245595619411",
  appId: process.env.REACT_APP_DB_APPID
};

    let app = null;
  // Initialize Firebase
  getApps().length === 0
    ? (app = initializeApp(firebaseConfig))
    : (app = getApp());
  //const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
// Initialize Firebase
    
const saveEvent = (event) => {
    push(ref(database, "events/"), { Event: event });
    alert("saved");
  };

useEffect(() => {
    const itemsRef = ref(database, "events/");

    onValue(itemsRef, (snapshot) => {
      let list = []
      snapshot.forEach((child) =>{
        list.push({
          key:child.key,
          body:child.val()
        })
      })
      setEvents({values:list});
    //   setVisible(true)
    })
  }, []);



  if (!events){
    return (
      <div>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
      <Calendar saveEvent={saveEvent} events={events.values}/>
  )

}


export default Firebase;