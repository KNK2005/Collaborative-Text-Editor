import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CollabTextEditor from './CollabTextEditor';
import HomePage from "./Page/HomePage";
import SignUp from "./Page/SignUpPage";
import LoginPage from "./Page/Login";
import TextEditor from "./Page/Texteditor";
import AboutPage from "./Page/About";
import NavBar from "./NavBar";
import Profile from "./Profile";
import Logout from "./Page/Logout"; // Import Logout component
import Dashboard from "./DashBoard";
import './App.css';
import './Page/TextEditor.css';

function App() {
  const [username, setUsername] = useState("");

  // Check if the user is logged in (by checking the token in localStorage)
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    // If user is logged in, fetch the username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Clear username and token from localStorage and reset state
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(""); // Reset the username state to trigger re-render
  };

  
  return (
    <Router>
      <div className="App">
        
        {/* Navigation Bar */}
        <NavBar username={username} />
        
        {/* Main Page Content */}
        <div id="page">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage username={username} />} />
            <Route path="/create-account" element={<SignUp />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage setUsernameGlobal={setUsername} />} />
            
            {/* Protected Routes */}
            <Route path="/text-editor" element={isLoggedIn ? <TextEditor /> : <Navigate to="/login" />} />
            <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="text-editor/:docId" element={isLoggedIn ? <CollabTextEditor /> : <Navigate to="/login" />} />
            
            {/* Logout Route */}
            <Route path="/logout" element={<Logout handleLogout={handleLogout} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />

            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
