'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/translations';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const t = translations[language];

  const features = [
    { name: t.features.healthTest.title, href: '/#health-test' },
    { name: t.features.symptoms.title, href: '/#symptoms' },
    { name: t.features.skinAnalysis.title, href: '/#skin-analysis' },
    { name: t.features.calories.title, href: '/#calories' },
    { name: t.features.water.title, href: '/#water' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 relative z-40">
      <nav className="mx-auto max-w-7xl px-6 h-12">
        <div className="flex h-12 items-center">
          {/* Logo and Company Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white" style={{ fontFamily: 'Inter' }}>
                Xlinic
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 justify-center items-center space-x-8">
            {/* Features Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFeatureDropdownOpen(!isFeatureDropdownOpen)}
                className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
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
                        onClick={() => {
                          setIsFeatureDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                        className="group flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/40"
                      >
                        <div>
                          <p className="font-medium">{feature.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="text-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t.nav.blog}
            </Link>
          </div>

          {/* Language Selector */}
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {language === 'tr' ? (
                  <>
                    <span className="text-xl">🇹🇷</span>
                    <span>Türkçe</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">🇬🇧</span>
                    <span>English</span>
                  </>
                )}
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Language Dropdown */}
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setLanguage('tr');
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/40"
                    >
                      <span className="text-xl">🇹🇷</span>
                      <span>Türkçe</span>
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/40"
                    >
                      <span className="text-xl">🇬🇧</span>
                      <span>English</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-4">
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
                      onClick={() => {
                        setIsFeatureDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 