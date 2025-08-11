'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const features = [
  {
    name: 'Smart Test Analysis',
    href: '#health-test',
  },
  {
    name: 'Symptom Tracking',
    href: '#symptoms',
  },
  {
    name: 'Skin Analysis',
    href: '#skin-analysis',
  },
  {
    name: 'Medication Reminders',
    href: '#medication',
  },
  {
    name: 'Health Reports',
    href: '#reports',
  }
];

export const Header = () => {
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Menü açıkken scroll'u engelle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLElement>, href?: string) => {
    e.preventDefault();
    const targetId = href ? href.replace('#', '') : 'coming-soon';
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 30;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsFeatureDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsFeatureDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.querySelector('.mobile-menu-container');
      const menuButton = document.querySelector('.mobile-menu-button');
      
      if (
        mobileMenu &&
        menuButton &&
        !mobileMenu.contains(event.target as Node) &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsFeatureDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
      sessionStorage.removeItem('scrollTarget');
      const element = document.getElementById(scrollTarget.replace('#', ''));
      if (element) {
        const offset = 30;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        setTimeout(() => {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, []);

  return (
    <motion.header 
      className="bg-white dark:bg-gray-900 relative z-40 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Company Name */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="flex items-center">
              <motion.span 
                className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" 
                style={{ fontFamily: 'Inter' }}
                whileHover={{ 
                  scale: 1.1,
                  filter: "brightness(1.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                Xlinic
              </motion.span>
            </a>
          </motion.div>

          {/* Desktop Navigation and Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Features Dropdown */}
            <div className="relative">
              <motion.button
                ref={buttonRef}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsFeatureDropdownOpen(!isFeatureDropdownOpen);
                }}
                className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-normal"
                style={{ fontFamily: 'system-ui' }}
                whileHover={{ 
                  scale: 1.05,
                  color: "#2563eb"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Features
                <motion.svg
                  className="ml-1 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: isFeatureDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              
              <AnimatePresence>
                {isFeatureDropdownOpen && (
                  <motion.div 
                    ref={dropdownRef}
                    className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="py-2 space-y-1">
                      {features.map((feature, index) => (
                        <motion.div
                          key={feature.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={feature.href}
                            onClick={(e) => {
                              e.preventDefault();
                              setIsFeatureDropdownOpen(false);
                              
                              if (window.location.pathname !== '/') {
                                sessionStorage.setItem('scrollTarget', feature.href);
                                window.location.href = '/';
                              } else {
                                const targetId = feature.href.replace('#', '');
                                const element = document.getElementById(targetId);
                                
                                if (element) {
                                  const offset = 30;
                                  const elementPosition = element.getBoundingClientRect().top;
                                  const offsetPosition = elementPosition + window.scrollY - offset;

                                  window.scrollTo({
                                    top: offsetPosition,
                                    behavior: 'smooth'
                                  });
                                }
                              }
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {feature.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog Link */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/blog"
                className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-normal"
                style={{ fontFamily: 'system-ui' }}
              >
                Blog
              </Link>
            </motion.div>

            {/* FAQ Link */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/faq"
                className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-normal"
                style={{ fontFamily: 'system-ui' }}
              >
                FAQ
              </Link>
            </motion.div>

            {/* Login Button */}
            <Link href="/auth">
              <motion.button
                className="px-6 py-2.5 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 hover:shadow-lg"
                style={{ fontFamily: 'system-ui' }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <button
              type="button"
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <motion.svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            </button>
          </motion.div>
        </div>

        {/* Mobile Menu Overlay and Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="mobile-menu-container md:hidden fixed top-[64px] right-0 w-[300px] h-[calc(100vh-64px)] bg-white dark:bg-gray-900 shadow-[0_0_40px_rgba(0,0,0,0.1)] z-[100] rounded-l-2xl border-l border-gray-100 dark:border-gray-800"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="h-full px-4 py-4 flex flex-col overflow-y-auto">
                <motion.div 
                  className="space-y-3 flex-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => {
                      if (window.location.pathname !== '/') {
                        sessionStorage.setItem('scrollTarget', '#health-test');
                        window.location.href = '/';
                      } else {
                        const element = document.getElementById('health-test');
                        if (element) {
                          const offset = 30;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.scrollY - offset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 rounded-xl text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200"
                    style={{ fontFamily: 'system-ui' }}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Features
                  </motion.button>

                  <div className="space-y-1.5">
                    <motion.button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.location.href = '/blog';
                      }}
                      className="block w-full text-left px-4 py-2.5 rounded-xl text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200"
                      style={{ fontFamily: 'system-ui' }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Blog
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.location.href = '/faq';
                      }}
                      className="block w-full text-left px-4 py-2.5 rounded-xl text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200"
                      style={{ fontFamily: 'system-ui' }}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      FAQ
                    </motion.button>
                  </div>
                </motion.div>

                {/* Mobile Login Button */}
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/auth">
                    <motion.button 
                      className="w-full px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 hover:shadow-lg"
                      style={{ fontFamily: 'system-ui' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Log In
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header; 