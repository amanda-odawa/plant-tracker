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

    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      alert("No changes made.")
      navigate('/')
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'linear-gradient(rgb(65, 114, 92), rgba(65, 114, 92, 0.19)), url(https://img.freepik.com/free-photo/fresh-growth-green-plant-nature-beauty-generated-by-ai_188544-21748.jpg?uid=R99210820&ga=GA1.1.1338765476.1744701059&semt=ais_hybrid&w=740)',      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <form 
        onSubmit={handleSubmit} 
        style={{
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          width: '100%',
          maxWidth: '600px',
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ marginBottom: '10px', color: '#41725c', fontSize: '26px' }}>Edit Plant</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
          style={{ ...inputStyle, minHeight: '100px' }}
        />

        <input
          name="watering_frequency"
          value={formData.watering_frequency}
          onChange={handleChange}
          placeholder="Watering Frequency"
          required
          style={inputStyle}
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          style={inputStyle}
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button
            type="submit"
            style={buttonStyle}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ ...buttonStyle, backgroundColor: '#ccc', color: '#333' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '16px',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  outline: 'none'
}

const buttonStyle = {
  flex: 1,
  padding: '12px',
  backgroundColor: '#41725c',
  color: '#fff',
  fontWeight: '600',
  fontSize: '16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: '0.3s'
}

export default EditPlant
