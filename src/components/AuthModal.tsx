import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail } from 'lucide-react';
import { useStore } from '../store/useStore';
import { signUpWithEmail, signInWithEmail } from '../lib/firebase';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, type }: AuthModalProps) {
  const { login } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const authFunction = type === 'signup' ? signUpWithEmail : signInWithEmail;
      const result = await authFunction(formData.email, formData.password);
      
      if (result?.user) {
        login({ email: result.user.email || '' });
        toast.success(type === 'login' ? 'Welcome back!' : 'Account created successfully!');
        onClose();
        window.location.href = '/';
      }
    } catch (error) {
      // Error handling is done in the auth functions
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6">
          {type === 'login' ? 'Welcome Back!' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={type === 'signup' ? 'Create a password' : 'Enter your password'}
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto" />
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>{type === 'login' ? 'Login' : 'Sign Up'}</span>
              </div>
            )}
          </button>

          <p className="text-sm text-center text-gray-500">
            {type === 'login' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ email: '', password: '' });
                    onClose();
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ email: '', password: '' });
                    onClose();
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Login
                </button>
              </>
            )}
          </p>
        </form>
      </motion.div>
    </div>
  );
}