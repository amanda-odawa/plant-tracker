import React, { useEffect, useState } from 'react'
import axios from 'axios'

const WaterLog = () => {
  const [users, setUsers] = useState([])
  const [plants, setPlants] = useState([])
  const [logs, setLogs] = useState([])

  const [formData, setFormData] = useState({
    user_id: '',
    plant_id: '',
    water_type: '',
    date: ''
  })

  const [filterUser, setFilterUser] = useState('')
  const [filterPlant, setFilterPlant] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/users').then(res => setUsers(res.data))
    axios.get('http://localhost:5000/plants').then(res => setPlants(res.data))
    axios.get('http://localhost:5000/logs').then(res => setLogs(res.data))
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/logs', formData)
    alert('Log added!')
    setFormData({ user_id: '', plant_id: '', water_type: '', date: '' })

    const updatedLogs = await axios.get('http://localhost:5000/logs')
    setLogs(updatedLogs.data)
  }

  const filteredLogs = logs.filter(log => {
    return (
      (filterUser === '' || log.user === filterUser) &&
      (filterPlant === '' || log.plant === filterPlant)
    )
  })

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Watering Log</h2>

      <form onSubmit={handleSubmit}>
        <select name="user_id" value={formData.user_id} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>

        <select name="plant_id" value={formData.plant_id} onChange={handleChange} required>
          <option value="">Select Plant</option>
          {plants.map(plant => (
            <option key={plant.id} value={plant.id}>{plant.name}</option>
          ))}
        </select>

        <select name="water_type" value={formData.water_type} onChange={handleChange} required>
          <option value="">Select Water Type</option>
          <option value="Fresh Water">Fresh Water</option>
          <option value="Rain Water">Rain Water</option>
          <option value="Salt Water">Salt Water</option>
        </select>

        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <button type="submit">Add Log</button>
      </form>

      <h3>Filter Logs</h3>
      <select onChange={(e) => setFilterUser(e.target.value)}>
        <option value="">All Users</option>
        {users.map(user => (
          <option key={user.id} value={user.username}>{user.username}</option>
        ))}
      </select>

      <select onChange={(e) => setFilterPlant(e.target.value)}>
        <option value="">All Plants</option>
        {plants.map(plant => (
          <option key={plant.id} value={plant.name}>{plant.name}</option>
        ))}
      </select>

      <h3>All Logs</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Plant</th>
            <th>Water Type</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.date}</td>
              <td>{log.plant}</td>
              <td>{log.water_type}</td>
              <td>{log.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WaterLog
