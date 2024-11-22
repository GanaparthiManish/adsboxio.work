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

      updateStreak: () => {
        const today = new Date().toDateString();
        const lastLogin = localStorage.getItem('lastLoginDate');
        
        if (lastLogin !== today) {
          localStorage.setItem('lastLoginDate', today);
          set(state => ({
            dailyStreak: state.dailyStreak + 1,
            coins: state.coins + (state.dailyStreak + 1) * 10
          }));
        }
      },

      login: async (data) => {
        const user = auth.currentUser;
        if (user) {
          const referralCode = generateReferralCode(user.uid);
          const userRef = doc(db, 'users', user.uid);
          
          try {
            const userDoc = await getDoc(userRef);
            const userData = userDoc.data();
            
            set({ 
              isAuthenticated: true,
              email: data.email,
              referralCode,
              upiId: userData?.upiId || null,
              coins: userData?.coins || 0,
              adsWatched: userData?.adsWatched || 0,
              dailyStreak: userData?.dailyStreak || 0,
              completedTasks: userData?.completedTasks || [],
              hasClaimedWelcomeBonus: userData?.hasClaimedWelcomeBonus || false,
              referralCount: userData?.referralCount || 0
            });

            await updateDoc(userRef, {
              referralCode,
              lastLogin: new Date().toISOString()
            });
          } catch (error) {
            console.error('Error updating user data:', error);
            toast.error('Failed to load user data');
          }
        }
      },

      logout: () => {
        auth.signOut();
        set({
          isAuthenticated: false,
          email: null,
          coins: 0,
          adsWatched: 0,
          dailyStreak: 0,
          completedTasks: [],
          hasClaimedWelcomeBonus: false,
          referralCode: null,
          referralCount: 0,
          upiId: null
        });
      },

      addCoins: async (amount) => {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          try {
            await updateDoc(userRef, {
              coins: get().coins + amount,
              adsWatched: amount === 10 ? get().adsWatched + 1 : get().adsWatched
            });
            
            set(state => ({ 
              coins: state.coins + amount,
              adsWatched: amount === 10 ? state.adsWatched + 1 : state.adsWatched
            }));
          } catch (error) {
            console.error('Error updating coins:', error);
            toast.error('Failed to update coins');
          }
        }
      },

      startTask: (taskId) => {
        // Task tracking logic here
      },

      completeTask: async (taskId) => {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          try {
            await updateDoc(userRef, {
              completedTasks: [...get().completedTasks, taskId]
            });
            
            set(state => ({
              completedTasks: [...state.completedTasks, taskId]
            }));
          } catch (error) {
            console.error('Error completing task:', error);
            toast.error('Failed to complete task');
          }
        }
      },

      claimWelcomeBonus: async () => {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          try {
            await updateDoc(userRef, {
              hasClaimedWelcomeBonus: true,
              coins: get().coins + 50
            });
            
            set(state => ({
              hasClaimedWelcomeBonus: true,
              coins: state.coins + 50
            }));
            
            toast.success('Welcome bonus claimed successfully!');
          } catch (error) {
            console.error('Error claiming welcome bonus:', error);
            toast.error('Failed to claim welcome bonus');
          }
        }
      },

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

      setUpiId: async (upiId: string) => {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          try {
            await updateDoc(userRef, { upiId });
            set({ upiId });
            toast.success('UPI ID updated successfully');
          } catch (error) {
            console.error('Error updating UPI ID:', error);
            toast.error('Failed to update UPI ID');
          }
        }
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        email: state.email,
        coins: state.coins,
        adsWatched: state.adsWatched,
        dailyStreak: state.dailyStreak,
        completedTasks: state.completedTasks,
        hasClaimedWelcomeBonus: state.hasClaimedWelcomeBonus,
        referralCode: state.referralCode,
        referralCount: state.referralCount,
        upiId: state.upiId
      })
    }
  )
);