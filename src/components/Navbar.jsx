import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { isAuthenticated, logout, currentUser } = useAuth();

  const navItemStyle = {
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    color: '#fff',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const navButtonStyle = {
    ...navItemStyle,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  };

  return (
    <nav 
      style={{ 
        backgroundColor: '#343a40', 
        padding: '1rem 2rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)' 
      }}
    >
      {/* Brand/Home Link */}
      <Link to="/" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none' }}>
        AuthApp
      </Link>

      {/* Navigation Links (Right Side) */}
      <div>
        {isAuthenticated ? (
          // --- Logged In State ---
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#adb5bd', fontSize: '0.9rem' }}>
              Welcome, {currentUser ? currentUser.username : 'User'}!
            </span>
            <Link to="/profile" style={{ ...navItemStyle, backgroundColor: '#007bff' }}>
              Profile
            </Link>
            <button onClick={logout} style={{ ...navButtonStyle, color: '#ffc107', marginLeft: '0.5rem' }}>
              Logout
            </button>
          </div>
        ) : (
          // --- Logged Out State ---
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/login" style={{ ...navItemStyle, backgroundColor: '#28a745' }}>
              Login
            </Link>
            <Link to="/register" style={{ ...navItemStyle, backgroundColor: '#6c757d' }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;