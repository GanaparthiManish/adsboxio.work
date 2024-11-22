import React, { useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { loadAd } from '../lib/adsense';

interface AdDisplayProps {
  onComplete: () => void;
}

export function AdDisplay({ onComplete }: AdDisplayProps) {
  const [timeLeft, setTimeLeft] = React.useState(5);
  const timerRef = useRef<NodeJS.Timeout>();
  const adRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);
  const adLoaded = useRef(false);

  const completeAd = useCallback(() => {
    if (hasCompletedRef.current) return; // Prevent multiple completions
    
    hasCompletedRef.current = true;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Only try to load ad if it hasn't been loaded yet
    if (!adLoaded.current && adRef.current) {
      try {
        loadAd(adRef.current);
        adLoaded.current = true;
      } catch (error) {
        console.error('Failed to load ad:', error);
        // Fallback - complete after timer even if ad fails
        setTimeout(completeAd, 5000);
      }
    }

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimeout(completeAd, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [completeAd]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-black/80 backdrop-blur-sm rounded-xl p-6 text-center"
    >
      <div className="space-y-4">
        <div 
          ref={adRef}
          className="w-full min-h-[250px] bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <ins
            className="adsbygoogle"
            style={{ 
              display: 'block',
              width: '100%',
              height: '250px'
            }}
            data-ad-client="ca-pub-7742116991881000"
            data-ad-slot="1234567890" // Replace with your ad slot ID
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
        <p className="text-white">
          Complete in: <span className="font-bold">{timeLeft}</span> seconds
        </p>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full"
          />
        </div>
      </div>
    </motion.div>
  );
}