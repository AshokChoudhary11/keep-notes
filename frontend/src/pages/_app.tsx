import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    // Initialize auth state from localStorage on app mount
    initAuth();
  }, [initAuth]);

  return <Component {...pageProps} />;
}

