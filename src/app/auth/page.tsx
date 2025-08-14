'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const { login } = useAuth();
  const router = useRouter();

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate Supabase magic link sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll simulate success
      setIsEmailSent(true);
      setMessage({ 
        type: 'success', 
        text: 'Magic link sent! Check your email and click the link to sign in.' 
      });
      
      // In real implementation, you would call Supabase auth.signInWithOtp()
      // const { error } = await supabase.auth.signInWithOtp({
      //   email: email,
      //   options: {
      //     emailRedirectTo: `${window.location.origin}/auth/callback`
      //   }
      // });
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send magic link. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('demo@xlinic.com', 'demo');
      router.push('/dashboard');
    } catch (error) {
      setMessage({ type: 'error', text: 'Demo login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setMessage(null);
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="auth-header">
          <motion.div
            className="auth-logo"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.span 
              className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent relative" 
              style={{ fontFamily: 'Inter' }}
              whileHover={{ 
                scale: 1.1,
                filter: "brightness(1.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Xlinic
              </motion.span>
              <span className="relative z-10">Xlinic</span>
            </motion.span>
          </motion.div>
          
          <motion.h1
            className="auth-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isEmailSent ? 'Check your email' : 'Welcome to Xlinic'}
          </motion.h1>
          
          <motion.p
            className="auth-subtitle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isEmailSent 
              ? 'We\'ve sent you a magic link to sign in securely'
              : 'Enter your email to get started with AI-powered health insights'
            }
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              className={`auth-message ${message.type}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isEmailSent ? (
            <motion.form 
              onSubmit={handleMagicLink} 
              className="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="form-group"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email address"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="auth-button"
                disabled={isLoading || !email}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span className="auth-loading"></span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>✨</span>
                    Send Magic Link
                  </span>
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              className="email-sent-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="email-sent-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                ✉️
              </motion.div>
              
              <motion.p
                className="email-sent-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                We've sent a secure magic link to:
              </motion.p>
              
              <motion.div
                className="email-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {email}
              </motion.div>
              
              <motion.button
                onClick={handleResendEmail}
                className="resend-button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Didn't receive it? Resend
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="auth-divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>or</span>
        </motion.div>

        <motion.button
          onClick={handleDemoLogin}
          className="auth-demo-button"
          disabled={isLoading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2">
            <span>🚀</span>
            Try Demo Mode
          </span>
        </motion.button>

        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="auth-link">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="auth-link">
              Privacy Policy
            </Link>
          </p>
          
          <Link href="/" className="auth-link text-sm flex items-center justify-center gap-1">
            <span>←</span>
            Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
