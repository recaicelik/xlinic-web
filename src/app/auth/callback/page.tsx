'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // No Supabase client needed
  const [supabase] = useState(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback started...');
        
        // Mock authentication - redirect to dashboard
        console.log('AuthCallback: Mock authentication, redirecting to dashboard...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        window.location.href = '/dashboard';
        
      } catch (err) {
        console.error('AuthCallback: Callback error:', err);
        setError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [router]);

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
