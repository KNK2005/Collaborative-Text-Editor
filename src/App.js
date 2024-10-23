import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import SignUp from "./Page/SignUpPage";
import LoginPage from "./Page/Login";
import TextEditor from "./Page/Texteditor";
import AboutPage from "./Page/About";
import WordEditor from "./Page/WordEditor";
import NavBar from "./NavBar";
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
        <NavBar />
          <div id="page">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-account" element={<SignUp />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/text-editor" element={<TextEditor />} />
              <Route path="/word-editor" element={<WordEditor />}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;