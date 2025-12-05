import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '', // Must match the backend payload field name
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Local Guard: If user is authenticated, redirect to profile instantly
  if (isAuthenticated) {
      return <Navigate to="/profile" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData); 
    } catch (err) {
      console.error("Login Error:", err);
      // Display the error message returned from the backend/API
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', padding: '0.75rem', border: '1px solid red', borderRadius: '4px', backgroundColor: '#fff0f0' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{ width: '100%', padding: '0.75rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          Don't have an account? <Link to="/register" style={{ color: '#28a745', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;