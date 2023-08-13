import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./styles.css";
import Chat from "./components/Chat";
import VocabularyBuilderPage from "./components/vocabulary";
import LandingPage from "./components/landingPage";
import Choose from "./components/choose";
import LoginSignup from "./components/LoginSignup";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/vocabulary" element={<VocabularyBuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
