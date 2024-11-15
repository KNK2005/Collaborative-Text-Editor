import React, { useState } from "react";  // <-- Make sure to import useState here

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CollabTextEditor from './CollabTextEditor';
import HomePage from "./Page/HomePage";
import SignUp from "./Page/SignUpPage";
import LoginPage from "./Page/Login";
import TextEditor from "./Page/Texteditor";
import AboutPage from "./Page/About";
import NavBar from "./NavBar";

import './App.css';
import './Page/TextEditor.css';
      // Import App.css first
; // Then import TextEditor.css


function App() {
  const [usernameGlobal, setUsernameGlobal] = useState("");

  return (
    <Router>
      <div className="App">
        
        {/* Navigation Bar */}
        <NavBar />
        
        {/* Main Page Content */}
        <div id="page">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-account" element={<SignUp />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage setUsernameGlobal={setUsernameGlobal} />} />
            <Route path="/text-editor" element={<TextEditor />} />

            <Route path="text-editor/:docId" element={<CollabTextEditor />} />
            <Route path="/" element={<CollabTextEditor />} /> {/* Generate new doc if no ID */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}
// App.js


export default App;
