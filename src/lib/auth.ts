import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import localforage from 'localforage';
import { connectivityManager } from './connectivity';

const OFFLINE_USERS_KEY = 'offline_users';

export const handleAuthSuccess = async (user: any) => {
  try {
    // First try to get/set data in Firestore
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
        
        // Store in local storage as backup
        await localforage.setItem(`user_${user.uid}`, userData);
      } else {
        // Update local storage with Firestore data
        await localforage.setItem(`user_${user.uid}`, userDoc.data());
      }
    } else {
      // Offline mode - store user data locally
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

    // Store minimal auth data for session management
    await localforage.setItem('authUser', {
      uid: user.uid,
      email: user.email,
      username: user.displayName || user.email?.split('@')[0] || 'User'
    });

    return true;
  } catch (error) {
    console.error('Auth success handling error:', error);
    
    // Last resort - store minimal data if everything else fails
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

export const syncOfflineData = async () => {
  if (!connectivityManager.isOnline) return;

  try {
    const offlineUsers = await localforage.getItem<Record<string, any>>(OFFLINE_USERS_KEY);
    if (!offlineUsers) return;

    for (const [uid, userData] of Object.entries(offlineUsers)) {
      if (userData.needsSync) {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, {
          ...userData,
          needsSync: false,
          lastSynced: new Date().toISOString()
        });
      }
    }

    await localforage.removeItem(OFFLINE_USERS_KEY);
  } catch (error) {
    console.error('Error syncing offline data:', error);
  }
};

export const checkAuthState = async () => {
  // First check Firebase Auth
  const user = auth.currentUser;
  if (user) return user;

  // Fallback to localforage
  try {
    const localUser = await localforage.getItem('authUser');
    return localUser;
  } catch (error) {
    console.error('Error checking auth state:', error);
    return null;
  }
};

export const handleAuthError = (error: any) => {
  console.error('Auth error:', error);

  switch (error.code) {
    case 'auth/network-request-failed':
      toast.error('Network error. Operating in offline mode.');
      break;
    case 'auth/popup-blocked':
      toast.error('Popup blocked. Please allow popups for this site.');
      break;
    case 'auth/popup-closed-by-user':
      // Silent fail - user intended this
      break;
    case 'auth/invalid-credential':
      toast.error('Invalid email or password.');
      break;
    case 'auth/user-not-found':
      toast.error('No account found with this email.');
      break;
    case 'auth/wrong-password':
      toast.error('Incorrect password.');
      break;
    case 'auth/too-many-requests':
      toast.error('Too many attempts. Please try again later.');
      break;
    case 'auth/invalid-email':
      toast.error('Invalid email address.');
      break;
    case 'auth/email-already-in-use':
      toast.error('Email already in use. Please login instead.');
      break;
    case 'auth/weak-password':
      toast.error('Password should be at least 6 characters.');
      break;
    case 'auth/operation-not-allowed':
      toast.error('Operation not allowed.');
      break;
    case 'unavailable':
      toast.warning('Operating in offline mode');
      break;
    default:
      if (!connectivityManager.isOnline) {
        toast.warning('Network unavailable. Some features may be limited.');
      } else {
        toast.error('Authentication failed. Please try again.');
      }
  }
};