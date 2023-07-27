import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Chat />} />
    //   </Routes>
    // </Router>
    <Chat />
  );
}

export default App;
