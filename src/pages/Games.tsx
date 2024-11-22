import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Gamepad, Crown, Star } from 'lucide-react';
import { GameCard } from '../components/GameCard';
import { useStore } from '../store/useStore';

export function Games() {
  const { isAuthenticated } = useStore();
  
  const games = [
    {
      id: 'dragon-quest',
      title: "Dragon Quest",
      description: "Battle mythical creatures in this epic adventure",
      image: "https://images.unsplash.com/photo-1642794167562-cd2e39c63dcd?auto=format&fit=crop&q=80&w=1200",
      coinsRequired: 5,
      earnCoins: 30,
      difficulty: "Medium",
      category: "Adventure"
    },
    {
      id: 'space-runner',
      title: "Space Runner",
      description: "Navigate through dangerous asteroid fields",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=1200",
      coinsRequired: 5,
      earnCoins: 20,
      difficulty: "Easy",
      category: "Arcade"
    },
    {
      id: 'crypto-clash',
      title: "Crypto Clash",
      description: "Trade and battle in the crypto universe",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
      coinsRequired: 5,
      earnCoins: 25,
      difficulty: "Hard",
      category: "Strategy"
    },
    {
      id: 'pixel-adventure',
      title: "Pixel Adventure",
      description: "Classic platformer with modern twists",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
      coinsRequired: 5,
      earnCoins: 22,
      difficulty: "Medium",
      category: "Platform"
    },
    {
      id: 'neon-racer',
      title: "Neon Racer",
      description: "High-speed racing in a cyberpunk world",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&q=80&w=1200",
      coinsRequired: 5,
      earnCoins: 28,
      difficulty: "Medium",
      category: "Racing"
    },
    {
      id: 'galaxy-defense',
      title: "Galaxy Defense",
      description: "Protect your space station from alien invasion",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
      coinsRequired: 5,
      earnCoins: 35,
      difficulty: "Hard",
      category: "Strategy"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Play & Earn Games
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Choose from our collection of exciting games and earn coins while having fun!
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Gamepad, label: 'Games', value: '6+' },
            { icon: Trophy, label: 'Players', value: '1000+' },
            { icon: Crown, label: 'Winners', value: '500+' },
            { icon: Star, label: 'Rating', value: '4.8/5' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-pink-400" />
              <p className="text-gray-300 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GameCard
                title={game.title}
                description={game.description}
                image={game.image}
                coinsRequired={game.coinsRequired}
                earnCoins={game.earnCoins}
                difficulty={game.difficulty}
                category={game.category}
                isLocked={!isAuthenticated}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}