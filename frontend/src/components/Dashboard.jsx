import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [plants, setPlants] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchPlants()
  }, [])

  const fetchPlants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/plants')
      setPlants(res.data)
    } catch (err) {
      console.error('Error fetching plants:', err)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this plant?')
    if (!confirmDelete) return
  
    try {
      await axios.delete(`http://localhost:5000/plants/${id}`)
      setPlants(prev => prev.filter(p => p.id !== id))
      alert('Plant deleted successfully!')
    } catch (err) {
      console.error("Failed to delete plant", err)
      alert('Failed to delete the plant.')
    }
  }
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Plants</h2>
      {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}
      {plants.map(plant => (
        <div key={plant.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <h3>{plant.name}</h3>
          <img src={plant.image} alt={plant.name} style={{ width: '150px' }} />
          <p>{plant.description}</p>
          <p>Water every: {plant.watering_frequency}</p>
          <button onClick={() => handleDelete(plant.id)}>Delete</button>
          <Link to={`/edit-plant/${plant.id}`}><button>Edit</button></Link>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
