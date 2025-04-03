'use client';

import Link from 'next/link';
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
    name: 'Health App Integration',
    href: '#integration',
  },
  {
    name: 'Calorie Tracking',
    href: '#calories',
  },
  {
    name: 'Water Tracking',
    href: '#water',
  },
  {
    name: 'Medication Reminders',
    href: '#medication',
  },
  {
    name: 'Health Reports',
    href: '#reports',
  },
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
      const offset = 30; // Reduced offset for better consistency
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

  // Add click outside listener for mobile menu
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
    // Check if there's a stored scroll target
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
      // Clear the stored target
      sessionStorage.removeItem('scrollTarget');
      // Get the element and scroll to it
      const element = document.getElementById(scrollTarget.replace('#', ''));
      if (element) {
        const offset = 30; // Use same offset as handleScrollToSection
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
    <header className="bg-white dark:bg-gray-900 relative z-40">
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: 'Inter' }}>
                Xlinic
              </span>
            </a>
          </div>

          {/* Desktop Navigation and Try Button - Right Aligned */}
          <div className="hidden md:flex items-center space-x-12">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                ref={buttonRef}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsFeatureDropdownOpen(!isFeatureDropdownOpen);
                }}
                className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-normal"
                style={{ fontFamily: 'system-ui' }}
              >
                Features
                <svg
                  className={`ml-1 h-5 w-5 transition-transform duration-300 ${isFeatureDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isFeatureDropdownOpen && (
                <div 
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-50"
                >
                  <div className="py-2 space-y-1">
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setIsFeatureDropdownOpen(false);
                          
                          if (window.location.pathname !== '/') {
                            sessionStorage.setItem('scrollTarget', feature.href);
                            window.location.href = '/';
                          } else {
                            // Desktop specific scroll behavior
                            const targetId = feature.href.replace('#', '');
                            console.log('Desktop scroll target:', targetId);
                            const element = document.getElementById(targetId);
                            
                            if (element) {
                              console.log('Desktop element found:', element);
                              const offset = 30;
                              const elementPosition = element.getBoundingClientRect().top;
                              const offsetPosition = elementPosition + window.scrollY - offset;

                              window.scrollTo({
                                top: offsetPosition,
                                behavior: 'smooth'
                              });
                            } else {
                              console.log('Desktop element not found:', targetId);
                            }
                          }
                        }}
                        className="block w-full px-4 py-2 text-base text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200"
                        style={{ fontFamily: 'system-ui' }}
                      >
                        {feature.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <Link
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/blog';
              }}
              className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-normal"
              style={{ fontFamily: 'system-ui' }}
            >
              Blog
            </Link>

            <Link
              href="/faq"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = '/faq';
              }}
              className="text-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-normal"
              style={{ fontFamily: 'system-ui' }}
            >
              FAQ
            </Link>

            {/* Try Xlinic Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== '/') {
                  sessionStorage.setItem('scrollTarget', '#coming-soon');
                  window.location.href = '/';
                } else {
                  const element = document.getElementById('coming-soon');
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
              className="px-6 py-2.5 bg-black text-white text-lg font-medium rounded-xl hover:bg-gray-900 transition-all duration-200 hover:shadow-lg"
              style={{ fontFamily: 'system-ui' }}
            >
              Try Xlinic
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay and Drawer */}
        <div 
          className={`mobile-menu-container md:hidden fixed top-[64px] right-0 w-[300px] h-[calc(100vh-64px)] bg-white dark:bg-gray-900 shadow-[0_0_40px_rgba(0,0,0,0.1)] z-[100] transform transition-all duration-500 ease-in-out rounded-l-2xl border-l border-gray-100 dark:border-gray-800 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full px-4 py-4 flex flex-col overflow-y-auto">
            <div className="space-y-3 flex-1">
              <button
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
              >
                Features
              </button>

              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/blog';
                  }}
                  className="block w-full text-left px-4 py-2.5 rounded-xl text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200"
                  style={{ fontFamily: 'system-ui' }}
                >
                  Blog
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.location.href = '/faq';
                  }}
                  className="block w-full text-left px-4 py-2.5 rounded-xl text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 transition-all duration-200"
                  style={{ fontFamily: 'system-ui' }}
                >
                  FAQ
                </button>
              </div>
            </div>

            {/* Mobile Try Xlinic Button */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname !== '/') {
                  sessionStorage.setItem('scrollTarget', '#coming-soon');
                  window.location.href = '/';
                } else {
                  const element = document.getElementById('coming-soon');
                  if (element) {
                    const offset = 30;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });

                    setTimeout(() => {
                      setIsMobileMenuOpen(false);
                    }, 500);
                  }
                }
              }}
              className="w-full mt-6 px-6 py-3 bg-black text-white text-lg font-medium rounded-xl hover:bg-gray-900 transition-all duration-200 hover:shadow-lg"
              style={{ fontFamily: 'system-ui' }}
            >
              Try Xlinic
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 