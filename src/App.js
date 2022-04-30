

import Firebase from "./components.js/Firebase.js";
import Signup from "./sigining/Signup.js";
import Form from './sigining/Form.js'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Signup />}/>
          <Route path="/calendar" element={<Firebase />} />
          <Route path="/login" element={<Form />} />
          <Route path="/register" element={<Form />} />
        
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
