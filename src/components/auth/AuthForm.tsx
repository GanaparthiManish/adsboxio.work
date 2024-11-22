import React from 'react';
import { LogIn } from 'lucide-react';

interface AuthFormProps {
  authMethod: 'email' | 'phone';
  formData: {
    email: string;
    phone: string;
    username: string;
    password: string;
  };
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  type: 'login' | 'signup';
}

export function AuthForm({ 
  authMethod, 
  formData, 
  onFormChange, 
  onSubmit, 
  isLoading, 
  type 
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {authMethod === 'email' ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onFormChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your phone number"
            required
            disabled={isLoading}
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={onFormChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Choose a username"
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
          onChange={onFormChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Enter your password"
          required
          disabled={isLoading}
          minLength={6}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
        ) : (
          <>
            <LogIn className="w-5 h-5" />
            <span>{type === 'login' ? 'Login' : 'Sign Up'}</span>
          </>
        )}
      </button>
    </form>
  );
}