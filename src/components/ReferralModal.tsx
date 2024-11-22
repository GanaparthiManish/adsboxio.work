import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode: string;
}

export function ReferralModal({ isOpen, onClose, referralCode }: ReferralModalProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const shareText = `Join AdsBox using my referral code: ${referralCode}\n\nEarn real money by watching ads! 💰\n\nhttps://adsbox-24c03.web.app`;
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success('Referral code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy code');
    }
  };

  const shareReferral = async () => {
    try {
      const shareData = {
        title: 'Join AdsBox',
        text: `Join AdsBox using my referral code: ${referralCode}\n\nEarn real money by watching ads! 💰`,
        url: 'https://adsbox-24c03.web.app'
      };

      if (navigator.share) {
        await navigator.share(shareData);
        toast.success('Thanks for sharing!');
      } else {
        copyToClipboard();
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        toast.error('Failed to share');
      }
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

        <h2 className="text-2xl font-bold mb-6">Share & Earn</h2>
        
        <div className="space-y-6">
          <div>
            <p className="text-gray-600 mb-2">Your Referral Code:</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg">
                {referralCode}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                <Copy className={`w-5 h-5 ${copied ? 'text-green-500' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={shareReferral}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              <Share2 className="w-5 h-5" />
              <span>Share with Friends</span>
            </button>

            <p className="text-sm text-gray-500 text-center">
              Earn 50 coins for each friend who joins using your code!
            </p>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold mb-2">How it works:</h3>
            <ol className="list-decimal ml-4 space-y-1 text-sm text-gray-600">
              <li>Share your referral code with friends</li>
              <li>They enter your code when signing up</li>
              <li>You get 50 coins when they join</li>
              <li>They get 25 bonus coins for using your code</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  );
}