import { create } from 'zustand';
import { User } from '../types/type';

interface UserStoreState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const UserStore = create<UserStoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
