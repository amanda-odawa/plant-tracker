import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const EditPlant = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    watering_frequency: '',
    image: ''
  })
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:5000/plants/${id}`)
      .then(res => {
        setFormData(res.data)
        setOriginalData(res.data)
      })
      .catch(err => console.error("Failed to load plant", err))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if there are no changes
    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      alert("No changes made.")
      navigate('/') // Redirect to dashboard
      return
    }

    try {
      await axios.put(`http://localhost:5000/plants/${id}`, formData)
      alert('Plant updated!')
      navigate('/')
    } catch (err) {
      console.error("Failed to update plant", err)
      alert('Something went wrong.')
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Plant</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input name="watering_frequency" value={formData.watering_frequency} onChange={handleChange} placeholder="Watering Frequency" />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default EditPlant
