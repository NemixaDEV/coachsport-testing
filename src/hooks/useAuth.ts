import { useState, useEffect } from 'react';
import { User } from '@/types';
import { adminUser, trainerUser, client1, client2, client3 } from '@/data/mockData';

// Simulación de autenticación
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial - en producción esto vendría de localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        // Si hay error, limpiar localStorage
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string, _password: string): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulación de login
        let foundUser: User | null = null;
        
        if (email === adminUser.email) foundUser = adminUser;
        else if (email === trainerUser.email) foundUser = trainerUser;
        else if (email === client1.email) foundUser = client1;
        else if (email === client2.email) foundUser = client2;
        else if (email === client3.email) foundUser = client3;
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem('userId', foundUser.id);
          resolve(foundUser);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  const register = (email: string, _password: string, name: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'client',
          createdAt: new Date(),
        };
        setUser(newUser);
        localStorage.setItem('userId', newUser.id);
        resolve(newUser);
      }, 1000);
    });
  };

  return {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };
};
