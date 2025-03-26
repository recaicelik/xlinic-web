'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { translations } from '@/translations';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  
  const t = translations['en'];

  const features = [
    { name: t.features.healthTest.title, href: '/#health-test' },
    { name: t.features.medication.title, href: '/#medication' },
    { name: t.features.symptoms.title, href: '/#symptoms' },
    { name: t.features.skinAnalysis.title, href: '/#skin-analysis' },
    { name: t.features.calories.title, href: '/#calories' },
    { name: t.features.water.title, href: '/#water' },
  ];

  const handleFeatureClick = async (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.split('#')[1];
    
    // Check if we're not on the home page
    if (window.location.pathname !== '/') {
      // Store the target ID in sessionStorage
      sessionStorage.setItem('scrollTarget', targetId);
      // Navigate to home page
      window.location.href = '/';
      return;
    }
    
    const scrollToElement = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 80; // Header yüksekliği için offset
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    // If we're already on the home page, scroll immediately
    scrollToElement();
    setIsFeatureDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Add effect to handle scroll after navigation
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
      // Clear the stored target
      sessionStorage.removeItem('scrollTarget');
      
      // Wait for the page to load and then scroll
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 relative z-40">
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: 'Inter' }}>
                Xlinic
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-16">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFeatureDropdownOpen(!isFeatureDropdownOpen)}
                className="text-base text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-normal"
                style={{ fontFamily: 'system-ui' }}
              >
                {t.nav.features}
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isFeatureDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Dropdown Menu */}
              {isFeatureDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-2">
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        onClick={(e) => handleFeatureClick(e, feature.href)}
                        className="group flex items-center px-4 py-3 text-base text-gray-500 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/40 font-normal"
                        style={{ fontFamily: 'system-ui' }}
                      >
                        <div>
                          <p className="font-normal">{feature.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-base text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-normal"
              style={{ fontFamily: 'system-ui' }}
            >
              {t.nav.blog}
            </Link>

            <Link
              href="/faq"
              className="text-base text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-normal"
              style={{ fontFamily: 'system-ui' }}
            >
              {t.nav.faq}
            </Link>
          </div>

          {/* Try Xlinic Button */}
          <div className="flex items-center">
            <Link 
              href="/#try-xlinic" 
              onClick={(e) => handleFeatureClick(e, '/#try-xlinic')}
              className="bg-black hover:bg-gray-900 text-white text-lg font-medium px-6 py-2 rounded-full transition-all transform hover:scale-105 hover:shadow-lg"
            >
              Try Xlinic
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-4">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => setIsFeatureDropdownOpen(!isFeatureDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                <span>{t.nav.features}</span>
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isFeatureDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isFeatureDropdownOpen && (
                <div className="pl-4">
                  {features.map((feature) => (
                    <Link
                      key={feature.name}
                      href={feature.href}
                      onClick={(e) => handleFeatureClick(e, feature.href)}
                      className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <div>
                        <p>{feature.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t.nav.blog}
              </Link>
              <Link
                href="/faq"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {t.nav.faq}
              </Link>
              <Link
                href="/#try-xlinic"
                onClick={(e) => handleFeatureClick(e, '/#try-xlinic')}
                className="block mt-2 text-center px-3 py-2 bg-black text-white rounded-full"
              >
                Try Xlinic
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 