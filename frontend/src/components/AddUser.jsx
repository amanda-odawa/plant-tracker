import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', { username });
      alert('User added!');
      setUsername('');
      navigate('/');
    } catch (err) {
      console.error("Failed to add user", err);
      alert('User already exists.');
    }
  };

  return (
    <div style={{
      backgroundImage: 'linear-gradient(rgb(65, 114, 92), rgba(65, 114, 92, 0.19)), url(https://img.freepik.com/free-photo/fresh-growth-green-plant-nature-beauty-generated-by-ai_188544-21748.jpg?uid=R99210820&ga=GA1.1.1338765476.1744701059&semt=ais_hybrid&w=740)',      backgroundSize: 'cover',
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
        }}>Add New User</h2>
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '500px',
          gap: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#555',
              fontSize: '14px',
              fontWeight: '500'
              
            }}>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s',
                boxSizing: 'border-box',
                backgroundColor: '#fff',
                ':focus': {
                  borderColor: '#41725c',
                  boxShadow: '0 0 0 2px rgba(65, 114, 92, 0.2)'
                }
              }}
            />
          </div>

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
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: '#ffebee'
                }
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
                transition: 'all 0.3s',
                ':hover': {
                  backgroundColor: '#325346'
                }
              }}
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;