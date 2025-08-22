'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  allergies?: string;
  chronicConditions?: string;
  medications?: string;
  familyHistory?: string;
  lifestyle?: {
    smoking: string;
    alcohol: string;
    exercise: string;
    diet: string;
  };
  medicalHistory?: string;
  currentSymptoms?: string;
  lastCheckup?: string;
  insuranceProvider?: string;
  subscription?: {
    plan: string;
    status: 'active' | 'inactive' | 'cancelled';
    startDate: string;
    endDate: string;
    tickets: number;
    usedTickets: number;
    bonusTickets: number;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  sendMagicLink: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // No Supabase client needed
  const [supabase] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    console.log('AuthContext: useEffect started');
    
    // Use local storage for authentication
    console.log('AuthContext: Checking local storage');
    const savedUser = localStorage.getItem('xlinic_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('AuthContext: Loaded user from local storage');
      } catch (error) {
        console.error('AuthContext: Error parsing saved user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const loadUserProfile = async (email: string) => {
    try {
      console.log('AuthContext: loadUserProfile started for user:', email);
      
      // Create mock user data
      const userData: User = {
        id: 'mock-user-id',
        email: email,
        name: email.split('@')[0],
        phone: '',
        dateOfBirth: '',
        gender: '',
        height: '',
        weight: '',
        bloodType: '',
        allergies: '',
        chronicConditions: '',
        medications: '',
        familyHistory: '',
        lifestyle: {
          smoking: '',
          alcohol: '',
          exercise: '',
          diet: ''
        },
        medicalHistory: '',
        currentSymptoms: '',
        lastCheckup: '',
        insuranceProvider: '',
        subscription: {
          plan: 'Standard Plan',
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          tickets: 6,
          usedTickets: 0,
          bonusTickets: 2
        }
      };

      console.log('AuthContext: Setting user data:', userData);
      setUser(userData);
      localStorage.setItem('xlinic_user', JSON.stringify(userData));
      console.log('AuthContext: User state updated, isAuthenticated should be:', !!userData);
    } catch (error) {
      console.error('AuthContext: Error loading user profile:', error);
    }
  };

  const sendMagicLink = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Mock authentication for development
      console.log('AuthContext: Mock authentication for email:', email);
      await loadUserProfile(email);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to authenticate' };
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('xlinic_user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('xlinic_user', JSON.stringify(updatedUser));
      }
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    sendMagicLink,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
