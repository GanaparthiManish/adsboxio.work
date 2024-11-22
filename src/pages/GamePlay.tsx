import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Sword, Shield } from 'lucide-react';
import { useStore } from '../store/useStore';

interface Enemy {
  name: string;
  health: number;
  attack: number;
  defense: number;
  image: string;
}

export function GamePlay() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { addCoins } = useStore();
  const [playerHealth, setPlayerHealth] = React.useState(100);
  const [enemyHealth, setEnemyHealth] = React.useState(100);
  const [gameOver, setGameOver] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const enemies: Record<string, Enemy> = {
    'dragon-quest': {
      name: 'Ancient Dragon',
      health: 100,
      attack: 15,
      defense: 10,
      image: 'https://images.unsplash.com/photo-1642794167562-cd2e39c63dcd?auto=format&fit=crop&q=80&w=1200'
    },
    'space-runner': {
      name: 'Space Pirate',
      health: 80,
      attack: 12,
      defense: 8,
      image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=1200'
    }
  };

  const currentEnemy = enemies[gameId || ''];

  const attack = () => {
    if (gameOver) return;

    // Player attacks enemy
    const playerDamage = Math.max(Math.floor(Math.random() * 20) - currentEnemy.defense, 0);
    const newEnemyHealth = Math.max(enemyHealth - playerDamage, 0);
    setEnemyHealth(newEnemyHealth);
    setMessage(`You dealt ${playerDamage} damage!`);

    // Enemy attacks back
    if (newEnemyHealth > 0) {
      setTimeout(() => {
        const enemyDamage = Math.max(Math.floor(Math.random() * currentEnemy.attack) - 5, 0);
        const newPlayerHealth = Math.max(playerHealth - enemyDamage, 0);
        setPlayerHealth(newPlayerHealth);
        setMessage(`${currentEnemy.name} dealt ${enemyDamage} damage!`);

        if (newPlayerHealth <= 0) {
          setGameOver(true);
          setMessage('Game Over! Try again!');
        }
      }, 1000);
    } else {
      setGameOver(true);
      setMessage('Victory! You earned 30 coins!');
      addCoins(30);
    }
  };

  const defend = () => {
    if (gameOver) return;
    
    const healAmount = Math.floor(Math.random() * 15) + 5;
    setPlayerHealth(Math.min(playerHealth + healAmount, 100));
    setMessage(`You recovered ${healAmount} health!`);

    // Enemy still attacks but with reduced damage
    setTimeout(() => {
      const enemyDamage = Math.max(Math.floor(Math.random() * (currentEnemy.attack / 2)) - 5, 0);
      const newPlayerHealth = Math.max(playerHealth - enemyDamage, 0);
      setPlayerHealth(newPlayerHealth);
      setMessage(`${currentEnemy.name} dealt ${enemyDamage} damage!`);

      if (newPlayerHealth <= 0) {
        setGameOver(true);
        setMessage('Game Over! Try again!');
      }
    }, 1000);
  };

  if (!currentEnemy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Game not found!</h1>
          <button
            onClick={() => navigate('/games')}
            className="text-purple-400 hover:text-purple-300"
          >
            Return to games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Games
          </button>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Player Stats */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Player</h2>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-red-400 rounded-full h-4 transition-all"
                    style={{ width: `${playerHealth}%` }}
                  />
                </div>
                <span className="text-white">{playerHealth}/100</span>
              </div>
            </div>

            {/* Enemy Stats */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">{currentEnemy.name}</h2>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-400" />
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-red-400 rounded-full h-4 transition-all"
                    style={{ width: `${enemyHealth}%` }}
                  />
                </div>
                <span className="text-white">{enemyHealth}/100</span>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div className="mt-8">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={currentEnemy.image}
                alt={currentEnemy.name}
                className="w-full h-full object-cover"
              />
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50"
                >
                  <p className="text-white text-2xl font-bold">{message}</p>
                </motion.div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={attack}
                disabled={gameOver}
                className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
              >
                <Sword className="w-5 h-5" />
                <span>Attack</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={defend}
                disabled={gameOver}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                <Shield className="w-5 h-5" />
                <span>Defend</span>
              </motion.button>
            </div>

            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={() => window.location.reload()}
                  className="text-purple-400 hover:text-purple-300"
                >
                  Play Again
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}