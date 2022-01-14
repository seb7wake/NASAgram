import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
