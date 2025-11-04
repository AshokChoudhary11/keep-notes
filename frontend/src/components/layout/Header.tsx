import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/store/authStore';

const Header: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  return (
    <header className="bg-primary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href={isAuthenticated ? '/notes' : '/'} className="text-2xl font-bold text-white">
            Keep Notes
          </Link>
          
          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link href="/notes" className="text-white hover:text-secondary-light transition-colors">
                  Notes
                </Link>
                <Link href="/account" className="text-white hover:text-secondary-light transition-colors">
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-secondary-light transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/" className="text-white hover:text-secondary-light transition-colors">
                  About
                </Link>
                <Link href="/login" className="text-white hover:text-secondary-light transition-colors">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

