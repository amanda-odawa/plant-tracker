import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/users', { username })
      alert('User added!')
      setUsername('')
      navigate('/') // Redirect to dashboard after success
    } catch (err) {
      console.error("Failed to add user", err)
      alert('Something went wrong.')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add a User</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Add</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default AddUser

