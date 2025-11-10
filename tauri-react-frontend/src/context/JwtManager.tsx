import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface JwtContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const JwtContext = createContext<JwtContextType | undefined>(undefined);

export const JwtProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://auth-service-gear-head.vercel.app/auth/login', {
        email,
        password,
      });
      const token = response.data.token;
      console.log('JWT Token:', token);
      setToken(token);
    } catch (err) {
      setError('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <JwtContext.Provider value={{ token, login, logout, loading, error }}>
      {children}
    </JwtContext.Provider>
  );
};

export const useJwt = () => {
  const context = useContext(JwtContext);
  if (context === undefined) {
    throw new Error('useJwt must be used within a JwtProvider');
  }
  return context;
};
