'use client';

import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-6 flex flex-col items-center gap-2">
      <p className="text-center text-gray-600 text-sm">
        Copyright © {currentYear} Xlinic
      </p>
      <div className="text-center text-gray-600 text-sm">
        <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
        {' | '}
        <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
        {' | '}
        <Link href="/support" className="hover:text-gray-900">Contact Support</Link>
      </div>
    </footer>
  );
};

export default Footer; 