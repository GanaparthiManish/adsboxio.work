import React from 'react';
import { Coins } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-800 to-purple-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Coins className="w-8 h-8 text-pink-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              AdsBox
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-1">
                <li><a href="/terms" className="hover:text-pink-300">Terms of Service</a></li>
                <li><a href="/support" className="hover:text-pink-300">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AdsBox. All rights reserved.</p>
          <p className="mt-1 text-pink-300">Watch Ads. Earn Real Money.</p>
        </div>
      </div>
    </footer>
  );
}