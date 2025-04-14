import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [plants, setPlants] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/plants').then(res => setPlants(res.data))
  }, [])

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/plants/${id}`)
    setPlants(plants.filter(p => p.id !== id))
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Plants</h2>
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
