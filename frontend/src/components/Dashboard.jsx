import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/plants').then(res => setPlants(res.data));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this plant?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5000/plants/${id}`);
        setPlants(plants.filter(p => p.id !== id));
        alert('Plant deleted successfully.');
      } catch (error) {
        alert('Failed to delete plant.');
        console.error(error);
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8faf7'
    }}>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Banner Image */}
        <div style={{
          width: '100%',
          height: '350px',
          backgroundImage: 'linear-gradient(rgba(65, 114, 92, 0.05), rgba(65, 114, 92, 0.9)), url(https://img.freepik.com/free-photo/photorealistic-sustainable-garden-with-home-grown-plants_23-2151479099.jpg?uid=R99210820&ga=GA1.1.1338765476.1744701059&w=740)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
          boxShadow: '0 4px 22px rgba(0, 0, 0, 0.55)'
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '4.6rem',
            fontWeight: '300',
            letterSpacing: '1px',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: '1.3',
            textShadow: '1px 3px 13px rgb(0, 0, 0)'
          }}>
            Nurture Your <span style={{ fontWeight: '600' }}>Green Friends</span>
          </h1>
        </div>

        {/* Plants Grid */}
        <div style={{ 
          padding: '0 5%',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <h2 style={{
            color: '#41725c',
            fontSize: '1.8rem',
            marginBottom: '40px',
            textAlign: 'center',
            fontWeight: '400',
            letterSpacing: '0.5px'
          }}>Your Plant Collection</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px',
            paddingBottom: '40px'
          }}>
            {plants.map(plant => (
              <div key={plant.id} style={{ 
                backgroundColor: '#ffffff',
                borderRadius: '4px',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                ':hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(65, 114, 92, 0.15)'
                }
              }}>
                {/* Plant Image */}
                <div style={{
                  width: '100%',
                  height: '400px',
                  backgroundColor: '#e8f0e8',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {plant.image ? (
                    <img 
                      src={plant.image} 
                      alt={plant.name} 
                      style={{ 
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }} 
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = '';
                        e.target.style.backgroundColor = '#e8f0e8';
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#e8f0e8',
                      color: '#41725c',
                      fontSize: '1rem'
                    }}>
                      <span>No Image Available</span>
                    </div>
                  )}
                </div>
                
                {/* Plant Content */}
                <div style={{
                  padding: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <h3 style={{
                      color: '#41725c',
                      margin: '0',
                      fontSize: '1.25rem',
                      fontWeight: '500',
                      letterSpacing: '0.3px'
                    }}>{plant.name}</h3>
                    
                    <div style={{
                      display: 'flex',
                      gap: '10px'
                    }}>
                      <Link 
                        to={`/edit-plant/${plant.id}`}
                        style={{
                          textDecoration: 'none'
                        }}
                      >
                        <button style={{
                          maxWidth: '80px',
                          width: '100%',
                          padding: '6px 12px',
                          backgroundColor: 'transparent',
                          color: '#41725c',
                          border: '1px solid #41725c',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease',
                          ':hover': {
                            backgroundColor: '#41725c',
                            color: 'white'
                          }
                        }}>
                          Edit
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(plant.id)}
                        style={{
                          maxWidth: '80px',
                          width: '100%',
                          padding: '6px 12px',
                          backgroundColor: 'transparent',
                          color: '#d32f2f',
                          border: '1px solid #d32f2f',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.3s ease',
                          ':hover': {
                            backgroundColor: '#d32f2f',
                            color: 'white'
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <p style={{
                    color: '#555',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    minHeight: '60px'
                  }}>{plant.description}</p>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px 12px',
                    backgroundColor: '#f5f9f5',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    color: '#41725c'
                  }}>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#41725c" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{ marginRight: '8px' }}
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Water every: {plant.watering_frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};

export default Dashboard;