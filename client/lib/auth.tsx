
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email, password, rememberMe) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock user data
const MOCK_USER: User = { id: '1', name: 'Admin User', email: 'test@example.com' };

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Simulate checking for a user session
    const session = localStorage.getItem('user_session') || sessionStorage.getItem('user_session');
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, rememberMe) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'test@example.com' && password === 'password') {
                const userData = MOCK_USER;
                setUser(userData);
                if (rememberMe) {
                    localStorage.setItem('user_session', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('user_session', JSON.stringify(userData));
                }
                resolve();
            } else {
                reject(new Error('We couldn’t sign you in. Check your email and password and try again.'));
            }
        }, 1000);
    });
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user_session');
    sessionStorage.removeItem('user_session');
    navigate('/login');
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div></div>; // Or a spinner component
    }

    if (!user) {
        return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }

    return children;
};
