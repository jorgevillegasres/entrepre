import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState } from '../types';
import { storage, generateId } from '../utils/helpers';

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = 'saas_auth_user';
const USERS_STORAGE_KEY = 'saas_users';

// Demo user for quick testing
const DEMO_USER: User = {
  id: 'demo-user-1',
  email: 'demo@empresa.com',
  name: 'Usuario Demo',
  businessName: 'Mi Empresa',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = storage.get<User | null>(STORAGE_KEY, null);
    if (savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }

    // Initialize demo user in storage if no users exist
    const users = storage.get<User[]>(USERS_STORAGE_KEY, []);
    if (users.length === 0) {
      storage.set(USERS_STORAGE_KEY, [{ ...DEMO_USER, password: 'demo123' }]);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get users from storage
    const users = storage.get<any[]>(USERS_STORAGE_KEY, []);

    // Find user
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      storage.set(STORAGE_KEY, userWithoutPassword);
      return true;
    }

    return false;
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    businessName: string
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get existing users
    const users = storage.get<any[]>(USERS_STORAGE_KEY, []);

    // Check if user already exists
    if (users.some((u) => u.email === email)) {
      return false;
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      email,
      name,
      businessName,
      role: 'admin',
      createdAt: new Date().toISOString(),
    };

    // Save user with password
    users.push({ ...newUser, password });
    storage.set(USERS_STORAGE_KEY, users);

    // Log in the new user
    setUser(newUser);
    setIsAuthenticated(true);
    storage.set(STORAGE_KEY, newUser);

    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storage.remove(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
