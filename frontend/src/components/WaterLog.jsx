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

  const handleClear = () => {
    setFormData({ user_id: '', plant_id: '', water_type: '', date: '' })
  }

  const filteredLogs = logs.filter(log => {
    return (
      (filterUser === '' || log.user === filterUser) &&
      (filterPlant === '' || log.plant === filterPlant)
    )
  })

  return (
    <div style={wrapperStyle}>
      <h2 style={headerStyle}>Watering Log Tracker</h2>

      <div style={containerStyle}>
        {/* Form Section (Above Logs) */}
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Add New Log</h3>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={formRowStyle}>
              <div style={{ flex: '1' }}>
                <select name="user_id" value={formData.user_id} onChange={handleChange} required style={fieldStyle}>
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: '1' }}>
                <select name="plant_id" value={formData.plant_id} onChange={handleChange} required style={fieldStyle}>
                  <option value="">Select Plant</option>
                  {plants.map(plant => (
                    <option key={plant.id} value={plant.id}>{plant.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={formRowStyle}>
              <div style={{ flex: '1' }}>
                <select name="water_type" value={formData.water_type} onChange={handleChange} required style={fieldStyle}>
                  <option value="">Select Water Type</option>
                  <option value="Fresh Water">fresh water</option>
                  <option value="Rain Water">rain water</option>
                  <option value="Salt Water">salt water</option>
                </select>
              </div>
              <div style={{ flex: '1' }}>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  style={fieldStyle}
                />
              </div>
            </div>

            <div style={buttonContainerStyle}>
              <button type="submit" style={buttonStyle}>Add Log</button>
              <button type="button" onClick={handleClear} style={clearButtonStyle}>Clear</button>
            </div>
          </form>
        </div>

        {/* Logs Table with Filters */}
        <div style={logsContainerStyle}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '20px' 
          }}>
            <h3 style={{ ...sectionTitle, marginBottom: 0 }}>All Logs</h3>

            {/* Filter Section (Above Table) */}
            <div style={formRowStyle}>
              <select onChange={(e) => setFilterUser(e.target.value)} style={fieldStyle}>
                <option value="">All Users</option>
                {users.map(user => (
                  <option key={user.id} value={user.username}>{user.username}</option>
                ))}
              </select>

              <select onChange={(e) => setFilterPlant(e.target.value)} style={fieldStyle}>
                <option value="">All Plants</option>
                {plants.map(plant => (
                  <option key={plant.id} value={plant.name}>{plant.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead style={{ backgroundColor: '#e0f2ea' }}>
                <tr>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Plant</th>
                  <th style={thStyle}>Water Type</th>
                  <th style={thStyle}>Watered By</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, index) => {
                  const plant = plants.find(p => p.name === log.plant)
                  return (
                    <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={tdStyle}>{log.date}</td>
                      <td style={tdStyle}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          {plant && (
                            <img
                              src={plant.image}
                              alt={plant.name}
                              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }}
                            />
                          )}
                          <span>{log.plant}</span>
                        </div>
                      </td>
                      <td style={tdStyle}>{log.water_type}</td>
                      <td style={tdStyle}>{log.user}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

// Styles
const wrapperStyle = {
  backgroundImage: 'linear-gradient(rgb(65, 114, 92), rgba(65, 114, 92, 0.19)), url(https://img.freepik.com/free-photo/fresh-growth-green-plant-nature-beauty-generated-by-ai_188544-21748.jpg?uid=R99210820&ga=GA1.1.1338765476.1744701059&semt=ais_hybrid&w=740)',  
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '40px 20px',
  fontFamily: 'Segoe UI, sans-serif'
}

const headerStyle = {
  color: '#ffffff',
  fontSize: '36px',
  textAlign: 'center',
  marginBottom: '40px',
  textShadow: '1px 1px 4px rgba(0,0,0,0.5)'
}

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr', // Single column layout
  gap: '25px',
  maxWidth: '900px',
  margin: '0 auto'
}

const logsContainerStyle = {
  display: 'block',
  overflowX: 'auto',
  maxWidth: '100%', 
  minWidth: '850px',
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '10px',
  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
}

const cardStyle = {
  backgroundColor: '#ffffff',
  padding: '25px',
  borderRadius: '10px',
  boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const sectionTitle = {
  fontSize: '20px',
  marginBottom: '15px',
  color: '#41725c'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  maxWidth: '600px',
  width: '100%',
  alignItems: 'center'
}

const formRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '15px',
  width: '100%'
}

const fieldStyle = {
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '16px',
  backgroundColor: '#fff',
  outline: 'none',
  flex: '1 1 45%',
  minWidth: '150px'
}

const buttonStyle = {
  flex: 1,
  padding: '12px 20px',
  backgroundColor: '#41725c',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s',
}

const clearButtonStyle = {
  flex: 1,
  padding: '12px 20px',
  backgroundColor: 'transparent',
  color: '#d32f2f',
  border: '1px solid #d32f2f',
  borderRadius: '6px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s'
}

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginTop: '20px'
}

const tableStyle = {
  width: '100%',
  maxWidth: '900px',
  borderCollapse: 'collapse',
  backgroundColor: '#fff',
  borderRadius: '8px',
  overflow: 'hidden'
}

const thStyle = {
  textAlign: 'left',
  padding: '12px',
  fontSize: '16px',
  color: '#2d5949',
  fontWeight: '600'
}

const tdStyle = {
  padding: '12px',
  fontSize: '15px',
  color: '#333'
}

export default WaterLog
