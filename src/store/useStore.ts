// store/useStore.ts
import { create } from 'zustand';
import { auth } from '../lib/firebase';

interface User {
  uid: string;
  email: string;
  username: string;
  coins?: number;
}

interface StoreState {
  isAuthenticated: boolean;
  user: User | null;
  coins: number;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}
export const useStore = create<StoreState>((set) => ({
  isAuthenticated: false,
  user: null,
  coins: 0,
  login: async (user) => {
    set(() => ({
      isAuthenticated: true,
      user,
      coins: user.coins || 0,
    }));
  },
  logout: async () => {
    try {
      await auth.signOut();
      set(() => ({
        isAuthenticated: false,
        user: null,
        coins: 0,
      }));
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
}));
