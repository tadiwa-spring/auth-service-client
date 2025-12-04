import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (err) {
        // If getProfile fails (e.g., 401 Unauthorized because the token is expired/invalid)
        console.error("Profile Error: Token issue detected.", err);
        // Clean up the invalid token
        localStorage.removeItem('token');
        // Redirect the user to log back in
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div className="container" style={{textAlign: 'center', marginTop: '2rem'}}>Loading profile...</div>;

  // This check is important: If loading is false but user is null, it means redirection failed, 
  // or the user was just kicked out and is waiting for the navigator.
  if (!user) return null; 

  return (
    <div className="container">
      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>Authenticated User Profile</h2>
        
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
            {user.roles && user.roles.join(', ')}
          </p>
        </div>

        <button 
          onClick={handleLogout}
          style={{ width: '100%', padding: '0.75rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.3s' }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;