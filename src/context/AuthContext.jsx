import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getProfile } from '../api/auth';

const AuthContext = createContext();

// This remains a named export
export const useAuth = () => {
  return useContext(AuthContext);
};

// Renamed AuthProvider internally to useAuthContext
const AuthContextComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchAndSetUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchAndSetUser = async () => {
    try {
      const user = await getProfile();
      setCurrentUser(user);
    } catch (error) {
      console.error("Token validation failed:", error.message);
      localStorage.removeItem('token');
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    const token = response.accessToken || response.token;
    localStorage.setItem('token', token);
    
    await fetchAndSetUser();
    navigate('/profile');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- FIX: Now exports as default ---
export default AuthContextComponent;