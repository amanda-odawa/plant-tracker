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
      backgroundImage: 'linear-gradient(rgb(65, 114, 92), rgba(65, 114, 92, 0.19)), url(https://img.freepik.com/free-photo/fresh-growth-green-plant-nature-beauty-generated-by-ai_188544-21748.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '60px 20px 20px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{
          color: '#41725c',
          fontSize: '24px',
          marginBottom: '25px',
          textAlign: 'center',
          fontWeight: '600'
        }}>
          Add a Plant
        </h2>

        <form onSubmit={formik.handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          width: '100%'
        }}>
          {['name', 'description', 'watering_frequency', 'image'].map((field) => (
            <input
              key={field}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              placeholder={field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
              required
              style={{
                width: '400px',
                padding: '12px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                backgroundColor: '#fff'
              }}
            />
          ))}

          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            width: '400px'
          }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
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
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
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
