import React from 'react';
import { motion } from 'framer-motion';
import { Play, Coins, Lock, Trophy, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

interface GameCardProps {
  title: string;
  description?: string;
  image: string;
  coinsRequired: number;
  earnCoins: number;
  difficulty?: string;
  category?: string;
  isLocked?: boolean;
}

export function GameCard({
  title,
  description,
  image,
  coinsRequired,
  earnCoins,
  difficulty,
  category,
  isLocked
}: GameCardProps) {
  const navigate = useNavigate();
  const { coins } = useStore();
  const canPlay = coins >= coinsRequired && !isLocked;
  const gameId = title.toLowerCase().replace(/\s+/g, '-');

  const handlePlay = () => {
    if (canPlay) {
      navigate(`/games/${gameId}`);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
          {description && <p className="text-sm text-gray-300">{description}</p>}
        </div>
      </div>

      <div className="p-4 space-y-4">
        {(category || difficulty) && (
          <div className="flex items-center justify-between text-sm">
            {category && (
              <div className="flex items-center space-x-2 text-purple-400">
                <Tag className="w-4 h-4" />
                <span>{category}</span>
              </div>
            )}
            {difficulty && (
              <div className="flex items-center space-x-2 text-pink-400">
                <Trophy className="w-4 h-4" />
                <span>{difficulty}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-yellow-400">
            <Coins className="w-4 h-4" />
            <span>Cost: {coinsRequired}</span>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <Coins className="w-4 h-4" />
            <span>Earn: {earnCoins}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          disabled={!canPlay}
          className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg font-semibold transition-all ${
            canPlay
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              : 'bg-gray-600 text-gray-300 cursor-not-allowed'
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="w-4 h-4" />
              <span>Login to Play</span>
            </>
          ) : !canPlay ? (
            <>
              <Coins className="w-4 h-4" />
              <span>Need {coinsRequired} Coins</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Play Now</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}