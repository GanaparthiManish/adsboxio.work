import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { auth, db } from '../lib/firebase';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { generateReferralCode } from '../lib/referralCode';
import { verifyUPI } from '../lib/upiValidation';
import toast from 'react-hot-toast';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  coins: number;
  adsWatched: number;
  dailyStreak: number;
  completedTasks: string[];
  hasClaimedWelcomeBonus: boolean;
  referralCode: string | null;
  referralCount: number;
  upiId: string | null;
  isVerifyingUpi: boolean;
  updateStreak: () => void;
  login: (data: { email: string }) => void;
  logout: () => void;
  addCoins: (amount: number) => void;
  startTask: (taskId: string) => void;
  completeTask: (taskId: string) => Promise<void>;
  claimWelcomeBonus: () => void;
  setUpiId: (upiId: string) => Promise<void>;
  verifyUpiId: (upiId: string) => Promise<boolean>;
}

export const useStore = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      email: null,
      coins: 0,
      adsWatched: 0,
      dailyStreak: 0,
      completedTasks: [],
      hasClaimedWelcomeBonus: false,
      referralCode: null,
      referralCount: 0,
      upiId: null,
      isVerifyingUpi: false,

      // [All previous methods remain the same]

      verifyUpiId: async (upiId: string) => {
        set({ isVerifyingUpi: true });
        
        try {
          const result = await verifyUPI(upiId);
          
          if (result.isValid) {
            const user = auth.currentUser;
            if (user) {
              const userRef = doc(db, 'users', user.uid);
              await updateDoc(userRef, { upiId });
              set({ upiId });
              toast.success('UPI ID verified successfully');
              return true;
            }
          } else {
            toast.error(result.message);
          }
          return false;
        } catch (error) {
          console.error('UPI verification error:', error);
          toast.error('Failed to verify UPI ID');
          return false;
        } finally {
          set({ isVerifyingUpi: false });
        }
      },

      // [Rest of the code remains the same]
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        // [Persistence configuration remains the same]
      })
    }
  )
);
