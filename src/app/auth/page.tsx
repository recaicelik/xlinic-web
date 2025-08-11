'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const { login, signup, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      let success = false;
      
      if (isLogin) {
        success = await login(formData.email, formData.password);
      } else {
        success = await signup(formData.email, formData.password, formData.name);
      }

      if (success) {
        setMessage({ type: 'success', text: isLogin ? 'Login successful!' : 'Account created successfully!' });
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } else {
        setMessage({ type: 'error', text: isLogin ? 'Login failed. Please try again.' : 'Signup failed. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setMessage(null);
    setFormData({ email: '', password: '', name: '' });
  };

  const handleSkip = async () => {
    await login('demo@xlinic.com', 'demo');
    router.push('/dashboard');
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
            Xlinic
          </motion.div>
          
          <motion.h1
            className="auth-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {isLogin ? 'Welcome back' : 'Create your account'}
          </motion.h1>
          
          <motion.p
            className="auth-subtitle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isLogin ? 'Sign in to continue to your health dashboard' : 'Join Xlinic to start your health journey'}
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

        <form onSubmit={handleSubmit} className="auth-form">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                className="form-group"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="name" className="form-label">
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </motion.div>
            )}
          </AnimatePresence>

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
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </motion.div>

          <motion.button
            type="submit"
            className="auth-button"
            disabled={isLoading}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <span className="auth-loading"></span>
            ) : (
              isLogin ? 'Sign in' : 'Create account'
            )}
          </motion.button>
        </form>

        <motion.button
          onClick={handleSkip}
          className="auth-skip-button"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Skip to demo
        </motion.button>

        <motion.div
          className="auth-divider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>or</span>
        </motion.div>

        <motion.div
          className="auth-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={toggleMode}
                className="auth-link"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={toggleMode}
                className="auth-link"
              >
                Sign in
              </button>
            </>
          )}
        </motion.div>

        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/" className="auth-link text-sm">
            ← Back to home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
