'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    // Read persisted token & user info from localStorage on startup
    const storedToken = localStorage.getItem('rm_token');
    const storedUser = localStorage.getItem('rm_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('rm_token');
        localStorage.removeItem('rm_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    const userInfo = { name: data.name, email: data.email };
    setToken(data.token);
    setUser(userInfo);
    localStorage.setItem('rm_token', data.token);
    localStorage.setItem('rm_user', JSON.stringify(userInfo));
    setIsAuthModalOpen(false);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    const userInfo = { name: data.name, email: data.email };
    setToken(data.token);
    setUser(userInfo);
    localStorage.setItem('rm_token', data.token);
    localStorage.setItem('rm_user', JSON.stringify(userInfo));
    setIsAuthModalOpen(false);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('rm_token');
    localStorage.removeItem('rm_user');
  };

  const openAuthModal = (tab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
