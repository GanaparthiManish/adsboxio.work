import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import localforage from 'localforage';
import { connectivityManager } from './connectivity';

const OFFLINE_USERS_KEY = 'offline_users';

export const handleAuthSuccess = async (user: any) => {
  try {
    if (connectivityManager.isOnline) {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const userData = {
          email: user.email,
          username: user.displayName || user.email?.split('@')[0] || 'User',
          createdAt: new Date().toISOString(),
          coins: 0,
          adsWatched: 0,
          dailyStreak: 0,
          referralCount: 0,
          completedTasks: [],
          pendingTasks: [],
          hasClaimedWelcomeBonus: false
        };

        await setDoc(userRef, userData);
        await localforage.setItem(`user_${user.uid}`, userData);
      } else {
        await localforage.setItem(`user_${user.uid}`, userDoc.data());
      }
    } else {
      const offlineUsers = await localforage.getItem<Record<string, any>>(OFFLINE_USERS_KEY) || {};
      
      if (!offlineUsers[user.uid]) {
        offlineUsers[user.uid] = {
          email: user.email,
          username: user.displayName || user.email?.split('@')[0] || 'User',
          createdAt: new Date().toISOString(),
          coins: 0,
          adsWatched: 0,
          dailyStreak: 0,
          referralCount: 0,
          completedTasks: [],
          pendingTasks: [],
          hasClaimedWelcomeBonus: false,
          needsSync: true
        };
        
        await localforage.setItem(OFFLINE_USERS_KEY, offlineUsers);
        toast.success('Logged in (Offline mode)');
      }
    }

    await localforage.setItem('authUser', {
      uid: user.uid,
      email: user.email,
      username: user.displayName || user.email?.split('@')[0] || 'User'
    });

    return true;
  } catch (error) {
    console.error('Auth success handling error:', error);
    try {
      await localforage.setItem('authUser', {
        uid: user.uid,
        email: user.email,
        username: user.displayName || user.email?.split('@')[0] || 'User',
        isEmergencyLogin: true
      });
      toast.warning('Logged in with limited functionality');
      return true;
    } catch (e) {
      toast.error('Failed to complete login. Please try again.');
      return false;
    }
  }
};