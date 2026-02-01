import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Mock authentication - always authenticated for demo
  useEffect(() => {
    setIsLoadingAuth(false);
    setIsLoadingPublicSettings(false);
    setAuthError(null);
  }, []);

  const navigateToLogin = () => {
    // Mock login navigation
    console.log('Navigate to login');
  };

  const value = {
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    navigateToLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};