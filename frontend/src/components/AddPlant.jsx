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
    <div style={{
      backgroundImage: 'linear-gradient(rgb(65, 114, 92), rgba(65, 114, 92, 0.19)), url(https://img.freepik.com/free-photo/fresh-growth-green-plant-nature-beauty-generated-by-ai_188544-21748.jpg?uid=R99210820&ga=GA1.1.1338765476.1744701059&semt=ais_hybrid&w=740)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        padding: '30px',
        width: '100%',
        maxWidth: '500px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          color: '#41725c',
          fontSize: '24px',
          marginBottom: '25px',
          textAlign: 'center',
          fontWeight: '600'
        }}>Add a Plant</h2>

        <form onSubmit={formik.handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          width: '100%',

          gap: '20px'
        }}>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Name"
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fff'
            }}
          />
          <input
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder="Description"
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fff'
            }}
          />
          <input
            name="watering_frequency"
            value={formik.values.watering_frequency}
            onChange={formik.handleChange}
            placeholder="Watering Frequency"
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fff'
            }}
          />
          <input
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            placeholder="Image URL"
            required
            style={{
              width: '100%',
              padding: '12px 15px',
              border: '1px solid #e0e0e0',
              borderRadius: '6px',
              fontSize: '16px',
              outline: 'none',
              boxSizing: 'border-box',
              backgroundColor: '#fff'
            }}
          />

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end',
            marginTop: '10px'
          }}>
            <button 
              type="button" 
              onClick={() => navigate('/')}
              style={{
                padding: '12px 20px',
                backgroundColor: 'transparent',
                color: '#d32f2f',
                border: '1px solid #d32f2f',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{
                padding: '12px 20px',
                backgroundColor: '#41725c',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPlant
