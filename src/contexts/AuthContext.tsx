'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient, User as SupabaseUser } from '@supabase/supabase-js';

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

  // Create Supabase client once
  const [supabase] = useState(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('AuthContext: Creating Supabase client with URL:', url);
    console.log('AuthContext: Creating Supabase client with key:', key ? 'Key exists' : 'No key');
    
    if (!url || !key) {
      console.error('AuthContext: Missing Supabase environment variables');
      throw new Error('Missing Supabase environment variables');
    }
    
    return createClient(url, key);
  });

  // Check for existing session on mount
  useEffect(() => {
    console.log('AuthContext: useEffect started');
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('AuthContext: Getting initial session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('AuthContext: Initial session check:', session ? 'Found' : 'Not found');
        console.log('AuthContext: Session details:', session);
        
        if (session?.user) {
          console.log('AuthContext: Loading user profile for:', session.user.email);
          await loadUserProfile(session.user);
        }
      } catch (error) {
        console.error('AuthContext: Error getting initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    console.log('AuthContext: Setting up auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthContext: Auth state changed:', event);
        console.log('AuthContext: Session in event:', session);
        console.log('AuthContext: Current user state:', user);
        
        // Handle different auth events
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
          if (session?.user) {
            console.log('AuthContext: User signed in, loading profile...');
            await loadUserProfile(session.user);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('AuthContext: User signed out');
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      console.log('AuthContext: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('AuthContext: loadUserProfile started for user:', supabaseUser.email);
      
      // Get user profile from our custom table
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('AuthContext: Error loading profile:', error);
        return;
      }
      
      console.log('AuthContext: Profile loaded:', profile);

      // Get subscription data
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', supabaseUser.id)
        .eq('status', 'active')
        .single();

      const userData: User = {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: profile?.full_name || supabaseUser.email?.split('@')[0] || '',
        phone: profile?.phone || '',
        dateOfBirth: profile?.date_of_birth || '',
        gender: profile?.gender || '',
        height: profile?.height_cm?.toString() || '',
        weight: profile?.weight_kg?.toString() || '',
        bloodType: profile?.blood_type || '',
        allergies: profile?.allergies || '',
        chronicConditions: profile?.chronic_conditions || '',
        medications: profile?.current_medications || '',
        familyHistory: profile?.family_medical_history || '',
        lifestyle: {
          smoking: profile?.smoking_status || '',
          alcohol: profile?.alcohol_consumption || '',
          exercise: profile?.exercise_frequency || '',
          diet: profile?.diet_type || ''
        },
        medicalHistory: profile?.past_medical_history || '',
        currentSymptoms: profile?.current_symptoms || '',
        lastCheckup: profile?.last_checkup_date || '',
        insuranceProvider: profile?.insurance_provider || '',
        subscription: subscription ? {
          plan: subscription.plan_name,
          status: subscription.status as 'active' | 'inactive' | 'cancelled',
          startDate: subscription.start_date,
          endDate: subscription.end_date,
          tickets: subscription.total_credits,
          usedTickets: subscription.used_credits,
          bonusTickets: subscription.bonus_credits
        } : undefined
      };

      console.log('AuthContext: Setting user data:', userData);
      setUser(userData);
      console.log('AuthContext: User state updated, isAuthenticated should be:', !!userData);
    } catch (error) {
      console.error('AuthContext: Error loading user profile:', error);
    }
  };

  const sendMagicLink = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to send magic link' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
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
