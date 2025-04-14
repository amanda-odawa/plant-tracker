import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'

const AddPlant = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      watering_frequency: '',
      image: ''
    },
    onSubmit: async (values, { resetForm }) => {
      await axios.post('http://localhost:5000/plants', values)
      alert('Plant added!')
      resetForm()
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
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddPlant
