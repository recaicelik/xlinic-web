'use client';

import Link from 'next/link';
import { useState } from 'react';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  type Feature = {
    name: string;
    href: string;
    description?: string;
  };

  const features: Feature[] = [
    { name: 'Sağlık Testi Analizi', href: '/#health-test' },
    { name: 'Semptom Takibi & Değerlendirme', href: '/#symptoms' },
    { name: 'Cilt Tarama & Değerlendirme', href: '/#skin-analysis' },
    { name: 'Kalori Takibi', href: '/#calories' },
    { name: 'Su Tüketimi Takibi', href: '/#water' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 relative z-40">
      <nav className="mx-auto max-w-7xl px-6 h-12">
        <div className="flex h-16 items-center">
          {/* Logo and Company Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-white" style={{ fontFamily: 'system-ui' }}>
                X
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                linic
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
              >
                Özellikler
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-2">
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="group flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div>
                          <p className="font-medium">{feature.name}</p>
                          {feature.description && (
                            <p className="text-gray-500 dark:text-gray-400 text-xs">{feature.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Blog
            </Link>
          </div>

          {/* Mobile Menu Button - Aligned to the right */}
          <div className="md:hidden ml-auto">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Ana menüyü aç</span>
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
              {/* Mobile Features Menu */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span>Özellikler</span>
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="pl-4">
                    {features.map((feature) => (
                      <Link
                        key={feature.name}
                        href={feature.href}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <div>
                          <p>{feature.name}</p>
                          {feature.description && (
                            <p className="text-gray-500 dark:text-gray-400 text-xs">{feature.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/blog"
                className="block px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Blog
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 