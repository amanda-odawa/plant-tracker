import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav style={{ 
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 5%',
      background: 'rgba(255, 255, 255, 0.98)',
      boxShadow: '0 4px 20px rgba(65, 114, 92, 0.15)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(65, 114, 92, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      {/* Logo/Brand Mark on the left */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#41725c',
          transition: 'transform 0.3s ease',
          ':hover': {
            transform: 'scale(1.02)'
          }
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backgroundColor: '#41725c',
            borderRadius: '12px',
            color: 'white',
            fontSize: '20px',
            boxShadow: '0 2px 8px rgba(65, 114, 92, 0.3)'
          }}>
            🌿
          </div>
          <span style={{ 
            background: 'linear-gradient(90deg, #41725c, #5a8c72)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>
            PlantCare
          </span>
        </div>
      </Link>

      {/* Navigation links on the right */}
      <div style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <NavLink to="/" currentPath={location.pathname}>Dashboard</NavLink>
        <NavLink to="/add-user" currentPath={location.pathname}>Add User</NavLink>
        <NavLink to="/add-plant" currentPath={location.pathname}>Add Plant</NavLink>
        <NavLink to="/logs" currentPath={location.pathname}>Watering Logs</NavLink>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, currentPath }) => (
  <Link 
    to={to} 
    style={{
      color: currentPath === to ? '#41725c' : '#6c757d',
      textDecoration: 'none',
      fontWeight: '500',
      padding: '10px 18px',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      position: 'relative',
      fontSize: '16px',
      ':hover': {
        color: '#41725c',
        backgroundColor: 'rgba(65, 114, 92, 0.08)'
      },
      ...(currentPath === to && {
        backgroundColor: 'rgb(65, 114, 92)',
        fontWeight: '600',
        color: '#fff',
      })
    }}
  >
    {children}
    {currentPath === to && (
      <div style={{
        position: 'absolute',
        bottom: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '20px',
        height: '3px',
        backgroundColor: '#41725c',
        borderRadius: '3px'
      }} />
    )}
  </Link>
);

export default Navbar;