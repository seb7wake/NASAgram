import React from 'react'
import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Home />} path="/" />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
