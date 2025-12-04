import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getProfile } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Initial Load: Check for existing token and validate it with the backend
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
    isAuthenticated: !!currentUser, // True if currentUser is not null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};