import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const AddPlant = () => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      watering_frequency: '',
      image: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('http://localhost:5000/plants', values)
        alert('Plant added!')
        resetForm()
        navigate('/') 
      } catch (err) {
        console.error('Failed to add plant', err)
        alert('Something went wrong.')
      }
    }
  })

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add a Plant</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Name"
          required
        />
        <input
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Description"
          required
        />
        <input
          name="watering_frequency"
          value={formik.values.watering_frequency}
          onChange={formik.handleChange}
          placeholder="Watering Frequency"
          required
        />
        <input
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          placeholder="Image URL"
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

export default AddPlant
