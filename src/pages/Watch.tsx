import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Coins } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AdDisplay } from '../components/AdDisplay';
import toast from 'react-hot-toast';

export function Watch() {
  const { addCoins, coins, isAuthenticated, adsWatched } = useStore();
  const [isWatching, setIsWatching] = React.useState(false);
  const [isAdCooldown, setIsAdCooldown] = React.useState(false);
  const currentCycle = adsWatched % 10;

  const handleAdComplete = useCallback(() => {
    addCoins(10);
    setIsWatching(false);
    setIsAdCooldown(true);
    
    // Add 30-second cooldown between ads
    setTimeout(() => {
      setIsAdCooldown(false);
    }, 30000);

    toast.success('Earned 10 coins!', {
      style: {
        background: '#10B981',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#10B981',
      },
    });
  }, [addCoins]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Please Login</h2>
          <p>You need to be logged in to watch ads and earn coins.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-black/40 rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
              Watch & Earn
            </h1>
            <p className="text-gray-300 text-lg">
              Watch ads to earn coins. Every ad watched brings you 10 coins!
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-purple-900/50 rounded-xl p-6 flex items-center space-x-4">
              <Coins className="w-8 h-8 text-yellow-400" />
              <div className="text-white">
                <p className="text-sm">Your Balance</p>
                <p className="text-2xl font-bold">{coins} Coins</p>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto">
            <div className="text-center text-white mb-6">
              <p className="text-lg mb-2">Ads Watched: {currentCycle}/10</p>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${currentCycle * 10}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-full"
                />
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {10 - currentCycle} more ads until next reward
              </p>
              <p className="text-sm text-green-400 mt-2">
                Completed Cycles: {Math.floor(adsWatched / 10)}
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isWatching ? (
                <AdDisplay key="ad" onComplete={handleAdComplete} />
              ) : (
                <motion.button
                  key="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWatching(true)}
                  disabled={isAdCooldown}
                  className={`w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
                    isAdCooldown ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Play className="w-5 h-5" />
                  <span>{isAdCooldown ? 'Please wait...' : 'Watch Ad'}</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}