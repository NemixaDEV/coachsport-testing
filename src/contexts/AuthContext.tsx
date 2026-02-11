import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { adminUser, trainerUser, client1, client2, client3 } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<User>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Función helper para convertir fechas de string a Date
  const parseUserDates = (parsedUser: any): User => {
    if (parsedUser.subscription) {
      if (parsedUser.subscription.startDate) {
        parsedUser.subscription.startDate = new Date(parsedUser.subscription.startDate);
      }
      if (parsedUser.subscription.endDate) {
        parsedUser.subscription.endDate = new Date(parsedUser.subscription.endDate);
      }
    }
    if (parsedUser.createdAt) {
      parsedUser.createdAt = new Date(parsedUser.createdAt);
    }
    return parsedUser;
  };

  useEffect(() => {
    // Cargar usuario desde localStorage al iniciar
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userWithDates = parseUserDates(parsedUser);
        console.log('[AuthContext] Usuario cargado desde localStorage:', {
          email: userWithDates.email,
          subscription: userWithDates.subscription,
          startDate: userWithDates.subscription?.startDate,
          endDate: userWithDates.subscription?.endDate,
          startDateType: typeof userWithDates.subscription?.startDate,
          endDateInstance: userWithDates.subscription?.startDate instanceof Date
        });
        setUser(userWithDates);
      } catch (e) {
        console.error('Error al parsear usuario:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string): Promise<User | null> => {
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
          // Crear una copia del usuario para evitar mutaciones
          const userCopy = { ...foundUser };
          
          // Asegurar que las fechas sean objetos Date
          if (userCopy.subscription) {
            userCopy.subscription = {
              ...userCopy.subscription,
              startDate: userCopy.subscription.startDate instanceof Date 
                ? userCopy.subscription.startDate 
                : new Date(userCopy.subscription.startDate),
              endDate: userCopy.subscription.endDate instanceof Date 
                ? userCopy.subscription.endDate 
                : new Date(userCopy.subscription.endDate),
            };
          }
          
          // Guardar usuario en localStorage (las fechas se serializarán como strings)
          localStorage.setItem('user', JSON.stringify(userCopy));
          localStorage.setItem('userId', userCopy.id);
          // Actualizar el estado del usuario (con fechas como Date)
          setUser(userCopy);
          resolve(userCopy);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    // Limpiar todo el localStorage
    localStorage.clear();
    console.log('[AuthContext] Usuario desconectado, localStorage limpiado');
  };

  const register = async (email: string, _password: string, name: string): Promise<User> => {
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
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('userId', newUser.id);
        resolve(newUser);
      }, 1000);
    });
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
