import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authApi } from '../api/auth.api';
import { userApi } from '../api/user.api';
import type { AuthContextType, LoginPayload, User } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authApi
      .verifyAuth()
      .then(() => refreshUser())
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const refreshUser = async () => {
    const profile = await userApi.getProfile();
    setUser(profile);
  };

  const login = async (payload: LoginPayload) => {
    await authApi.login(payload);
    await refreshUser();
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}