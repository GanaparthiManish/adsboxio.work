import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';

export function Support() {
  const faqs = [
    {
      question: "How do I earn coins?",
      answer: "You can earn coins by watching ads and completing tasks. Each ad watched earns you 10 coins."
    },
    {
      question: "How can I withdraw my earnings?",
      answer: "Once you've accumulated enough coins, you can redeem them for real money through UPI. The minimum withdrawal amount is ₹100 (1000 coins)."
    },
    {
      question: "What is the referral program?",
      answer: "You can earn coins by inviting friends using your unique referral code. You'll receive 50 coins for each friend who joins."
    },
    {
      question: "How long does it take to receive payment?",
      answer: "Payments are typically processed within 4-5 business days after redemption. Make sure your UPI ID is verified for smooth transactions."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Help & Support
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Get assistance with your account, earnings, and general inquiries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Contact Us</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-pink-400" />
                <span>support@adsbox-support.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MessageCircle className="w-5 h-5 text-pink-400" />
                <span>Response within 24 hours</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
          >
            <h2 className="text-2xl font-semibold mb-6 text-white">Quick Support</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <textarea
                placeholder="Describe your issue"
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-8 text-white flex items-center">
            <HelpCircle className="w-6 h-6 mr-2 text-pink-400" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/10 pb-6 last:border-0"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}