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

  useEffect(() => {
    axios.get(`http://localhost:5000/plants/${id}`).then(res => {
      setFormData(res.data)
    })
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:5000/plants/${id}`, formData)
    alert('Plant updated!')
    navigate('/')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Plant</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
        <input name="watering_frequency" value={formData.watering_frequency} onChange={handleChange} placeholder="Watering Frequency" />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  )
}

export default EditPlant
