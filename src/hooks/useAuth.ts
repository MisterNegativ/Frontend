import { useState, useEffect } from 'react';
import { useStorage } from './useStorage';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getItem, setItem } = useStorage();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const auth = await getItem('auth');
    setIsAuthenticated(auth === 'true');
    setLoading(false);
  };

  const login = async () => {
    setIsAuthenticated(true);
    await setItem('auth', 'true');
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await setItem('auth', 'false');
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
  };
};