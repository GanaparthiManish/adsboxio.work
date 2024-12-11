import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Instagram, MessageCircle, Send, ExternalLink, Coins, Gift, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

interface Task {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  reward: number;
  link: string;
  buttonText: string;
  type: string;
  verificationSteps: string[];
}

export function Tasks() {
  const { 
    isAuthenticated,
    coins,
    addCoins,
    completedTasks,
    startTask,
    completeTask,
    hasClaimedWelcomeBonus,
    claimWelcomeBonus,
    referralCode,
    referralCount
  } = useStore();
  
  const [showReferralInfo, setShowReferralInfo] = useState(false);
  const [showVerification, setShowVerification] = useState<string | null>(null);

  const tasks: Task[] = [
    {
      id: 'youtube',
      title: 'YouTube',
      icon: Youtube,
      description: 'Subscribe to our YouTube channel',
      reward: 10,
      link: 'https://www.youtube.com/@AdsBoxio',
      buttonText: 'Subscribe',
      type: 'Video Channel',
      verificationSteps: [
        'Subscribe to the channel',
        'Like our latest video',
        'Turn on notifications'
      ]
    },
    {
      id: 'instagram',
      title: 'Instagram',
      icon: Instagram,
      description: 'Follow our Instagram page',
      reward: 5,
      link: 'https://www.instagram.com/adsbox.io',
      buttonText: 'Follow',
      type: 'Social Media',
      verificationSteps: [
        'Follow our Instagram page',
        'Like our latest post',
        'Save our latest post'
      ]
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      icon: MessageCircle,
      description: 'Join our WhatsApp channel',
      reward: 8,
      link: 'https://whatsapp.com/channel/0029VawwPtNCnA7sic1tQJ3q',
      buttonText: 'Join Channel',
      type: 'Channel',
      verificationSteps: [
        'Join the WhatsApp channel',
        'Send "Hi" in the channel',
        'Turn on notifications'
      ]
    },
    {
      id: 'telegram',
      title: 'Telegram',
      icon: Send,
      description: 'Join our Telegram group',
      reward: 7,
      link: 'https://t.me/adsbox3',
      buttonText: 'Join Group',
      type: 'Group',
      verificationSteps: [
        'Join the Telegram group',
        'Send "Hello" in the group',
        'Turn on notifications'
      ]
    }
  ];

  const handleTaskStart = async (taskId: string) => {
    if (!isAuthenticated) {
      toast.error('Please login to complete tasks');
      return;
    }

    startTask(taskId);
    window.open(tasks.find(t => t.id === taskId)?.link, '_blank');
    setShowVerification(taskId);
  };

  const handleVerification = async (taskId: string) => {
    if (!isAuthenticated) return;

    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      await completeTask(taskId);
      await addCoins(task.reward);
      
      toast.success(`Congratulations! You earned ${task.reward} coins!`, {
        duration: 5000,
        icon: '🎉'
      });
      
      setShowVerification(null);
    } catch (error) {
      console.error('Error verifying task:', error);
      toast.error('Failed to verify task. Please try again.');
    }
  };

  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      toast.success('Referral code copied to clipboard!');
    }
  };

   
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Complete Tasks & Earn
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Follow our social media channels and earn rewards!
          </p>
        </motion.div>

        {!hasClaimedWelcomeBonus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-yellow-500/20">
                  <Gift className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Welcome Bonus!</h3>
                  <p className="text-yellow-300">Claim your 50 coins welcome bonus</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={claimWelcomeBonus}
                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg font-semibold"
              >
                Claim Now
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Share2 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Refer & Earn</h3>
                <p className="text-purple-300">Earn 50 coins for each referral!</p>
                <p className="text-sm text-gray-400 mt-1">Total Referrals: {referralCount}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowReferralInfo(!showReferralInfo)}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold"
            >
              Share Code
            </motion.button>
          </div>
          {showReferralInfo && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-white/5 rounded-lg"
            >
              <p className="text-white mb-2">Your Referral Code:</p>
              <div className="flex items-center space-x-2">
                <code className="bg-white/10 px-4 py-2 rounded-lg flex-1 text-purple-300">
                  {referralCode}
                </code>
                <button
                  onClick={copyReferralCode}
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30"
                >
                  Copy
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <task.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">{task.title}</h3>
                    <p className="text-gray-300">{task.description}</p>
                    <p className="text-sm text-gray-400 mt-1">Type: {task.type}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Coins className="w-5 h-5" />
                    <span className="font-semibold">{task.reward}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">One-time reward</p>
                </div>
              </div>

              {showVerification === task.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-white/5 rounded-lg"
                >
                  <h4 className="text-white font-semibold mb-2">Verification Steps:</h4>
                  <ol className="list-decimal ml-4 text-gray-300 space-y-2">
                    {task.verificationSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVerification(task.id)}
                    className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    I've Completed These Steps
                  </motion.button>
                </motion.div>
              )}

              <div className="mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTaskStart(task.id)}
                  disabled={completedTasks?.includes(task.id)}
                  className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-semibold transition-all ${
                    completedTasks?.includes(task.id)
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                  }`}
                >
                  {completedTasks?.includes(task.id) ? (
                    'Completed'
                  ) : (
                    <>
                      <span>{task.buttonText}</span>
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}