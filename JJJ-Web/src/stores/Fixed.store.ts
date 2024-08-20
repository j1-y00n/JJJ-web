import { create } from 'zustand';

interface FixedStore {
  isFixed: boolean;
  setIsFixed: (value: boolean) => void;
}

export const FixedStore = create<FixedStore>((set) => ({
  isFixed: false,
  setIsFixed: (fixed: boolean) => set({ isFixed: fixed }),
}));
