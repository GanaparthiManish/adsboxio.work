import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, AlertTriangle } from 'lucide-react';

export function Terms() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Setup Instructions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Follow these steps to set up your website
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="w-8 h-8 text-pink-400" />
              <h2 className="text-2xl font-semibold text-white">Firebase Setup</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Create Firebase Project</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Go to Firebase Console (console.firebase.google.com)</li>
                  <li>Create a new project</li>
                  <li>Enable Authentication (Email, Phone, Google)</li>
                  <li>Create Firestore Database</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Get Firebase Config</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Go to Project Settings</li>
                  <li>Find the Firebase configuration object</li>
                  <li>Update src/lib/firebase.ts with your config</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-semibold text-white">AdSense & Domain</h2>
            </div>
            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Domain Setup</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Purchase a domain from a provider (e.g., GoDaddy, Namecheap)</li>
                  <li>Set up DNS records for your hosting</li>
                  <li>Configure SSL certificate</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. AdSense Integration</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Create AdSense account (adsense.google.com)</li>
                  <li>Add your domain to AdSense</li>
                  <li>Get your Publisher ID</li>
                  <li>Update index.html with your AdSense script</li>
                  <li>Create ad units and get ad slot IDs</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Code Updates</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Update AdDisplay component with your ad slots</li>
                  <li>Configure payment thresholds in useStore</li>
                  <li>Set up Firebase security rules</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-yellow-500/10 backdrop-blur-sm rounded-xl p-6"
        >
          <div className="flex items-center space-x-3 text-yellow-400">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-semibold">Important Notes</p>
          </div>
          <ul className="mt-2 text-gray-300 list-disc pl-5 space-y-2">
            <li>Ensure your site complies with AdSense policies</li>
            <li>Implement proper user verification for payments</li>
            <li>Keep Firebase security rules updated</li>
            <li>Regularly backup your Firestore database</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}