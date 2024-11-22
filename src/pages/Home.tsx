import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Gift, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useStore } from '../store/useStore';

export function Home() {
  const navigate = useNavigate();
  const { updateStreak, isAuthenticated } = useStore();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (isAuthenticated) {
      updateStreak();
    }
  }, [isAuthenticated, updateStreak]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-xl overflow-hidden mb-12 h-[500px]"
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Space banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center">
            <div className="p-8 max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400"
              >
                Watch Ads, Earn Real Money
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-300 mb-8"
              >
                Join our community and start earning today
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/watch')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all shadow-lg"
              >
                <Play className="w-6 h-6" />
                <span>Start Earning Now</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-white">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-800 to-pink-900 rounded-xl p-6 shadow-xl"
          >
            <Play className="w-12 h-12 text-pink-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Watch & Earn</h2>
            <p className="text-gray-300">Get 10 coins for every ad. Complete cycles of 10 ads to earn more!</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-pink-800 to-purple-900 rounded-xl p-6 shadow-xl"
          >
            <Gift className="w-12 h-12 text-purple-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Daily Rewards</h2>
            <p className="text-gray-300">Login daily for bonus coins and maintain your streak!</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-900 to-pink-800 rounded-xl p-6 shadow-xl"
          >
            <Users className="w-12 h-12 text-pink-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Refer & Earn</h2>
            <p className="text-gray-300">Get 50 coins for each friend who joins our platform!</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}