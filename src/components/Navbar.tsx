import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coins, User, LogIn, ListChecks, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { AuthModal } from './AuthModal';

export function Navbar() {
  const { coins, isAuthenticated, logout } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [authType, setAuthType] = React.useState<'login' | 'signup'>('login');
  const location = useLocation();

  const handleAuth = (type: 'login' | 'signup') => {
    setAuthType(type);
    setShowAuthModal(true);
    setIsOpen(false);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/watch', label: 'Watch & Earn' },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Coins className="w-8 h-8 text-pink-400" />
              </motion.div>
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                AdsBox
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`hover:text-pink-300 transition ${
                    location.pathname === link.path ? 'text-pink-300' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center space-x-2 bg-purple-800 px-4 py-2 rounded-full"
                  >
                    <Coins className="w-5 h-5 text-yellow-300" />
                    <span className="font-semibold">{coins}</span>
                  </motion.div>
                  
                  <Link to="/profile" className="hover:text-pink-300 transition">
                    <User className="w-5 h-5" />
                  </Link>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="hover:text-pink-300 transition"
                  >
                    <LogIn className="w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={() => handleAuth('login')}
                    className="px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuth('signup')}
                    className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 transition"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden px-4 py-2 space-y-2 border-t border-white/10"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 hover:text-pink-300 transition ${
                    location.pathname === link.path ? 'text-pink-300' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block py-2 hover:text-pink-300 transition"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 hover:text-pink-300 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuth('login')}
                    className="block w-full text-left py-2 hover:text-pink-300 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuth('signup')}
                    className="block w-full text-left py-2 hover:text-pink-300 transition"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        type={authType}
      />
    </>
  );
}