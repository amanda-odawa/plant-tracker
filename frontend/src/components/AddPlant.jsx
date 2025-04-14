import React, { useState } from 'react'
import axios from 'axios'

const AddPlant = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    watering_frequency: '',
    image: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/plants', formData)
    alert('Plant added!')
    setFormData({ name: '', description: '', watering_frequency: '', image: '' })
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add a Plant</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
        <input name="watering_frequency" value={formData.watering_frequency} onChange={handleChange} placeholder="Watering Frequency" required />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddPlant
