import React, { useState } from 'react'
import axios from 'axios'

const AddUser = () => {
  const [username, setUsername] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/users', { username })
    alert('User added!')
    setUsername('')
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
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddUser
