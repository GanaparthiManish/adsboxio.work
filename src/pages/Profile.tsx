import React from 'react';
import { Coins, Gift, TrendingUp, Wallet, Check, Mail, User, Smartphone, Share2, Copy, ExternalLink, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export function Profile() {
  const { coins, dailyStreak, adsWatched, referralCount, upiId, setUpiId, email, phoneNumber, username } = useStore();
  const [newUpiId, setNewUpiId] = React.useState('');
  const [verificationStatus, setVerificationStatus] = React.useState<'idle' | 'verifying' | 'verified'>('idle');
  const [showReferralModal, setShowReferralModal] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const referralCode = 'ADSBOX' + Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleUpiVerification = () => {
    setVerificationStatus('verifying');
    setTimeout(() => {
      setUpiId(newUpiId);
      setVerificationStatus('verified');
    }, 2000);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateMoney = (coins: number) => {
    return (coins / 1000) * 100;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-4 border-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome, {username}!</h1>
                  <div className="flex items-center space-x-3">
                    <Coins className="w-6 h-6 text-yellow-300" />
                    <span className="text-xl font-semibold">{coins} Coins</span>
                    <span className="text-sm text-gray-200">
                      (₹{calculateMoney(coins).toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0 space-y-2">
                {email && (
                  <div className="flex items-center space-x-2 text-gray-200">
                    <Mail className="w-4 h-4" />
                    <span>{email}</span>
                  </div>
                )}
                {phoneNumber && (
                  <div className="flex items-center space-x-2 text-gray-200">
                    <Smartphone className="w-4 h-4" />
                    <span>{phoneNumber}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">Statistics</h2>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-white">
                      <p className="text-gray-300">Daily Streak</p>
                      <p className="text-xl font-semibold">{dailyStreak} days</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-pink-500/20 p-3 rounded-lg">
                      <Gift className="w-6 h-6 text-pink-400" />
                    </div>
                    <div className="text-white">
                      <p className="text-gray-300">Ads Watched</p>
                      <p className="text-xl font-semibold">{adsWatched}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setShowReferralModal(true)}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-500/20 p-3 rounded-lg">
                      <Share2 className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div className="text-white">
                      <p className="text-gray-300">Referrals</p>
                      <p className="text-xl font-semibold">{referralCount}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-6 text-white">Payment Settings</h2>
                
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-4 text-white">Available Balance</h3>
                  <div className="flex items-center space-x-3 mb-6">
                    <DollarSign className="w-8 h-8 text-green-400" />
                    <span className="text-3xl font-bold text-white">₹{calculateMoney(coins).toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        UPI ID for Payments
                      </label>
                      {upiId ? (
                        <div className="flex items-center space-x-2 text-green-400">
                          <Check className="w-5 h-5" />
                          <span>UPI ID Verified: {upiId}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={newUpiId}
                            onChange={(e) => setNewUpiId(e.target.value)}
                            placeholder="Enter UPI ID"
                            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleUpiVerification}
                            disabled={verificationStatus === 'verifying'}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition flex items-center justify-center space-x-2"
                          >
                            {verificationStatus === 'verifying' ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            ) : (
                              'Verify UPI'
                            )}
                          </motion.button>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Minimum Withdrawal</h4>
                      <p className="text-gray-300">₹100 (1000 coins)</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={!upiId || coins < 500}
                      className={`w-full py-3 rounded-lg font-semibold transition ${
                        upiId && coins >= 500
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white'
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      Withdraw Money
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}