import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/auth';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  // Pulling state and logout function from AuthContext
  const { currentUser, isLoading, logout } = useAuth();
  
  // Use a local state to manage the display data
  const [user, setUser] = useState(currentUser);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for the global AuthContext to finish its initial token validation
    if (isLoading) return;
    
    if (currentUser) {
        // If context validated the user, set local state and stop loading
        setUser(currentUser); 
        setIsDataLoading(false);
    } else {
        // If context finished loading and found no user, redirect (redundant, but safe)
        navigate('/login');
    }
    
    // Cleanup function is not strictly necessary here but good practice
    return () => {};
  }, [currentUser, isLoading, navigate]);

  if (isLoading || isDataLoading) return <div className="container" style={{textAlign: 'center', marginTop: '2rem'}}>Loading profile...</div>;
  if (!user) return null; 

  return (
    <div className="container">
      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Authenticated User Profile</h2>
        
        <div style={{ marginBottom: '2rem', border: '1px solid #ddd', padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong style={{ display: 'inline-block', width: '100px' }}>Username:</strong> {user.username}
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong style={{ display: 'inline-block', width: '100px' }}>Email:</strong> {user.email}
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            <strong style={{ display: 'inline-block', width: '100px' }}>User ID:</strong> {user.id}
          </p>
          <p>
            <strong style={{ display: 'inline-block', width: '100px' }}>Roles:</strong> 
            {user.roles && (Array.isArray(user.roles) ? user.roles.join(', ') : user.roles)}
          </p>
        </div>

        <button 
          onClick={logout} 
          style={{ width: '100%', padding: '0.75rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;