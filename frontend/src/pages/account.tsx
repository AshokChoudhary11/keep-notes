import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/store/authStore';

const AccountPage: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, mounted, router]);

  const handleLogout = () => {
    clearAuth();
    router.push('/login');
  };

  if (!mounted || !isAuthenticated || !user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Layout
      title="Account Settings"
      description="Manage your Keep Notes account settings and profile"
      keywords="account, profile, settings, user account"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-text-primary mb-8">Account Settings</h1>

          <div className="bg-background-card rounded-lg shadow-card p-8 mb-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-gray-200">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Username
                </label>
                <p className="text-lg text-text-primary">{user.user_name}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Email Address
                </label>
                <p className="text-lg text-text-primary">{user.user_email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  User ID
                </label>
                <p className="text-sm text-text-light font-mono">{user.user_id}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">
                  Member Since
                </label>
                <p className="text-lg text-text-primary">{formatDate(user.created_on)}</p>
              </div>
            </div>
          </div>

          <div className="bg-background-card rounded-lg shadow-card p-8">
            <h2 className="text-xl font-semibold text-text-primary mb-6 pb-3 border-b border-gray-200">
              Account Actions
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <h3 className="font-medium text-text-primary">Logout</h3>
                  <p className="text-sm text-text-secondary mt-1">
                    Sign out of your account on this device
                  </p>
                </div>
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AccountPage;

