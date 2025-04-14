import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddUser from './components/AddUser'
import AddPlant from './components/AddPlant'
import WaterLog from './components/WaterLog'
import Navbar from './components/Navbar'
import EditPlant from './components/EditPlant'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-plant" element={<AddPlant />} />
        <Route path="/logs" element={<WaterLog />} />
        <Route path="/edit-plant/:id" element={<EditPlant />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
