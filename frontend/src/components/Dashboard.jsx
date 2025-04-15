import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/plants').then(res => setPlants(res.data));
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/plants/${id}`);
    setPlants(plants.filter(p => p.id !== id));
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

      {/* Footer */}
<footer style={{
  backgroundColor: '#41725c',
  color: 'white',
  padding: '50px 0 30px',
  textAlign: 'left'
}}>
  <div style={{
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 5%'
  }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '40px',
      marginBottom: '40px'
    }}>
      {/* About Column */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '20px',
          gap: '10px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            🌿
          </div>
          <h3 style={{ 
            margin: '0',
            fontWeight: '600',
            fontSize: '1.2rem'
          }}>PlantCare</h3>
        </div>
        <p style={{ 
          margin: '0 0 15px 0',
          fontSize: '0.95rem',
          lineHeight: '1.6',
          opacity: '0.85'
        }}>Helping plant lovers nurture their green companions since 2023.</p>
        <div style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px'
        }}>
          <a href="#" style={{ color: 'white', opacity: '0.7', ':hover': { opacity: '1' } }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a href="#" style={{ color: 'white', opacity: '0.7', ':hover': { opacity: '1' } }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
            </svg>
          </a>
          <a href="#" style={{ color: 'white', opacity: '0.7', ':hover': { opacity: '1' } }}>
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Quick Links Column */}
      <div>
        <h4 style={{ 
          margin: '0 0 20px 0',
          fontWeight: '600',
          fontSize: '1.1rem',
          position: 'relative',
          paddingBottom: '10px',
          ':after': {
            content: '""',
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)'
          }
        }}>Quick Links</h4>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '12px'
        }}>
          <div>
            <Link to="/" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.95rem',
              opacity: '0.85',
              display: 'block',
              marginBottom: '10px',
              transition: 'all 0.3s ease',
              ':hover': {
                opacity: '1',
                paddingLeft: '5px'
              }
            }}>Home</Link>
            <Link to="/dashboard" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.95rem',
              opacity: '0.85',
              display: 'block',
              marginBottom: '10px',
              transition: 'all 0.3s ease',
              ':hover': {
                opacity: '1',
                paddingLeft: '5px'
              }
            }}>Dashboard</Link>
            <Link to="/plants" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.95rem',
              opacity: '0.85',
              display: 'block',
              marginBottom: '10px',
              transition: 'all 0.3s ease',
              ':hover': {
                opacity: '1',
                paddingLeft: '5px'
              }
            }}>All Plants</Link>
          </div>
          <div>
            <Link to="/add-plant" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.95rem',
              opacity: '0.85',
              display: 'block',
              marginBottom: '10px',
              transition: 'all 0.3s ease',
              ':hover': {
                opacity: '1',
                paddingLeft: '5px'
              }
            }}>Add Plant</Link>
            <Link to="/add-user" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.95rem',
              opacity: '0.85',
              display: 'block',
              marginBottom: '10px',
              transition: 'all 0.3s ease',
              ':hover': {
                opacity: '1',
                paddingLeft: '5px'
              }
            }}>Add User</Link>
            <Link to="/logs" style={{ 
              color: 'white', 
              textDecoration: 'none',
              fontSize: '0.95rem',
              opacity: '0.85',
              display: 'block',
              marginBottom: '10px',
              transition: 'all 0.3s ease',
              ':hover': {
                opacity: '1',
                paddingLeft: '5px'
              }
            }}>Watering Logs</Link>
          </div>
        </div>
      </div>

      {/* Resources Column */}
      <div>
        <h4 style={{ 
          margin: '0 0 20px 0',
          fontWeight: '600',
          fontSize: '1.1rem',
          position: 'relative',
          paddingBottom: '10px',
          ':after': {
            content: '""',
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)'
          }
        }}>Resources</h4>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <a href="#" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '0.95rem',
            opacity: '0.85',
            transition: 'all 0.3s ease',
            ':hover': {
              opacity: '1',
              paddingLeft: '5px'
            }
          }}>Plant Care Guides</a>
          <a href="#" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '0.95rem',
            opacity: '0.85',
            transition: 'all 0.3s ease',
            ':hover': {
              opacity: '1',
              paddingLeft: '5px'
            }
          }}>Watering Tips</a>
          <a href="#" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '0.95rem',
            opacity: '0.85',
            transition: 'all 0.3s ease',
            ':hover': {
              opacity: '1',
              paddingLeft: '5px'
            }
          }}>Seasonal Plant Advice</a>
          <a href="#" style={{ 
            color: 'white', 
            textDecoration: 'none',
            fontSize: '0.95rem',
            opacity: '0.85',
            transition: 'all 0.3s ease',
            ':hover': {
              opacity: '1',
              paddingLeft: '5px'
            }
          }}>Troubleshooting</a>
        </div>
      </div>

      {/* Contact Column */}
      <div>
        <h4 style={{ 
          margin: '0 0 20px 0',
          fontWeight: '600',
          fontSize: '1.1rem',
          position: 'relative',
          paddingBottom: '10px',
          ':after': {
            content: '""',
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '40px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)'
          }
        }}>Contact Us</h4>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span style={{ 
              fontSize: '0.95rem',
              opacity: '0.85'
            }}>plantcare@example.com</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span style={{ 
              fontSize: '0.95rem',
              opacity: '0.85'
            }}>+1 (555) 123-4567</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span style={{ 
              fontSize: '0.95rem',
              opacity: '0.85'
            }}>123 Garden St, Greenville</span>
          </div>
        </div>
      </div>
    </div>

    {/* Copyright */}
    <div style={{ 
      borderTop: '1px solid rgba(255, 255, 255, 0.15)', 
      paddingTop: '25px',
      textAlign: 'center'
    }}>
      <p style={{ 
        margin: '0',
        fontSize: '0.85rem',
        opacity: '0.7'
      }}>
        © {new Date().getFullYear()} PlantCare App. All rights reserved. 
        <span style={{ margin: '0 5px' }}>•</span>
        <a href="#" style={{ 
          color: 'white', 
          textDecoration: 'none',
          opacity: '0.7',
          ':hover': {
            textDecoration: 'underline'
          }
        }}>Privacy Policy</a>
        <span style={{ margin: '0 5px' }}>•</span>
        <a href="#" style={{ 
          color: 'white', 
          textDecoration: 'none',
          opacity: '0.7',
          ':hover': {
            textDecoration: 'underline'
          }
        }}>Terms of Service</a>
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Dashboard;