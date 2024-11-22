import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import toast from 'react-hot-toast';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error: any) {
    console.error('Signup error:', error);
    if (error.code === 'auth/email-already-in-use') {
      toast.error('Email already in use');
    } else if (error.code === 'auth/invalid-email') {
      toast.error('Invalid email address');
    } else if (error.code === 'auth/weak-password') {
      toast.error('Password should be at least 6 characters');
    } else {
      toast.error('Failed to create account');
    }
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.code === 'auth/invalid-credential') {
      toast.error('Invalid email or password');
    } else if (error.code === 'auth/user-not-found') {
      toast.error('No account found with this email');
    } else {
      toast.error('Failed to login');
    }
    throw error;
  }
};