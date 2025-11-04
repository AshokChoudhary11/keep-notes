import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { authAPI } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  
  const [formData, setFormData] = useState({
    user_email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.user_email)) {
      newErrors.user_email = 'Please provide a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.login(formData);

      if (response.success && response.data) {
        setAuth(response.data.user, response.data.token);
        router.push('/notes');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      setErrors({ submit: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout 
      title="Login"
      description="Login to your Keep Notes account to access your notes"
      keywords="login, sign in, notes app, keep notes"
    >
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-background-card rounded-lg shadow-modal p-8 w-full max-w-md border-t-4 border-primary"
        >
          <div className="mb-8 text-center">
            <div className="inline-block bg-accent-peach rounded-t-lg px-6 py-2 mb-4">
              <h1 className="text-2xl font-bold text-text-primary">Login</h1>
            </div>
            <p className="text-text-secondary">Welcome back! Please login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="user_email"
              placeholder="Email"
              label="Email"
              value={formData.user_email}
              onChange={handleChange}
              error={errors.user_email}
              required
            />

            <Input
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {errors.submit && (
              <div className="p-3 bg-red-100 border border-accent-red rounded-md text-accent-red text-sm">
                {errors.submit}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
              <Link href="/register" className="flex-1">
                <Button type="button" variant="secondary" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default LoginPage;

