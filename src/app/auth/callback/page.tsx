'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create Supabase client once
  const [supabase] = useState(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('AuthCallback: Creating Supabase client with URL:', url);
    console.log('AuthCallback: Creating Supabase client with key:', key ? 'Key exists' : 'No key');
    
    if (!url || !key) {
      console.error('AuthCallback: Missing Supabase environment variables');
      throw new Error('Missing Supabase environment variables');
    }
    
    return createClient(url, key);
  });

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback started...');
        
        // Get the URL hash and search params
        const hash = window.location.hash;
        const searchParams = new URLSearchParams(window.location.search);
        
        console.log('AuthCallback: URL hash:', hash);
        console.log('AuthCallback: URL search params:', searchParams.toString());
        
        // Check if we have access_token in hash or search params
        const accessToken = searchParams.get('access_token') || 
                          new URLSearchParams(hash.substring(1)).get('access_token');
        
        console.log('AuthCallback: Access token found:', !!accessToken);
        
        if (accessToken) {
          // Set the session manually
          console.log('AuthCallback: Setting session manually...');
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: searchParams.get('refresh_token') || 
                          new URLSearchParams(hash.substring(1)).get('refresh_token') || ''
          });
          
          if (error) {
            console.error('AuthCallback: Error setting session:', error);
            setError('Authentication failed. Please try again.');
            return;
          }
          
          if (data.session) {
            console.log('AuthCallback: Session set successfully for user:', data.session.user.email);
            
            // Wait a moment for the session to be properly established
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Redirect to dashboard
            console.log('AuthCallback: Redirecting to dashboard...');
            window.location.href = '/dashboard';
          } else {
            console.log('AuthCallback: No session after setting access token');
            setError('Session could not be established. Please try again.');
          }
        } else {
          // Try the old method
          console.log('AuthCallback: No access token, trying old method...');
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('AuthCallback: Session error:', error);
            setError('Authentication failed. Please try again.');
            return;
          }

          if (data.session) {
            console.log('AuthCallback: Session found, user:', data.session.user.email);
            console.log('AuthCallback: Redirecting to dashboard...');
            window.location.href = '/dashboard';
          } else {
            console.log('AuthCallback: No session found');
            setError('No session found. Please try signing in again.');
          }
        }
      } catch (err) {
        console.error('AuthCallback: Callback error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [supabase.auth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Completing sign in...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sign In Failed</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}
