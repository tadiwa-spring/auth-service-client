import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'; // NEW IMPORT
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext'; 

const NotFound = () => <div style={{textAlign: 'center', marginTop: '2rem'}}>404 Not Found</div>;

// --- Dedicated Protected Route Component (Guard) ---
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{textAlign: 'center', marginTop: '4rem', fontSize: '1.2rem'}}>Loading... Checking authentication status...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// --- App Component: Where routing is defined ---
function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        
        <Routes>
          {/* Public Routes - Accessible to anyone */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Dynamic Route: Catches the token from the email link */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Protected Route */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          {/* Home Route directs to profile if logged in, or login if logged out */}
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;