import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#eee' }}>
    <Link to="/">Dashboard</Link>
    <Link to="/add-user">Add User</Link>
    <Link to="/add-plant">Add Plant</Link>
    <Link to="/logs">Watering Logs</Link>
  </nav>
)

export default Navbar
