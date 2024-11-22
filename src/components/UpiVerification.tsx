import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export function UpiVerification() {
  const { verifyUpiId, upiId, isVerifyingUpi } = useStore();
  const [newUpiId, setNewUpiId] = useState('');
  const [error, setError] = useState('');

  const handleVerification = async () => {
    if (!newUpiId) {
      setError('Please enter a UPI ID');
      return;
    }

    setError('');
    const success = await verifyUpiId(newUpiId);
    
    if (!success) {
      setError('Invalid UPI ID. Please check and try again.');
    }
  };

  if (upiId) {
    return (
      <div className="flex items-center space-x-2 text-green-400">
        <Check className="w-5 h-5" />
        <span>UPI ID Verified: {upiId}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          value={newUpiId}
          onChange={(e) => setNewUpiId(e.target.value)}
          placeholder="Enter UPI ID (e.g., name@upi)"
          className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleVerification}
        disabled={isVerifyingUpi}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition flex items-center justify-center space-x-2"
      >
        {isVerifyingUpi ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span>Verifying...</span>
          </div>
        ) : (
          'Verify UPI'
        )}
      </motion.button>

      <p className="text-sm text-gray-400">
        Note: Please ensure you enter a valid UPI ID for receiving payments.
      </p>
    </div>
  );
}