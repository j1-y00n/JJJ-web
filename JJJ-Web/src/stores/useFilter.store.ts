import { create } from 'zustand';
import { CategoryAgeType } from '../types/TempMockdata';

interface FilterState {
  activeAge: CategoryAgeType;
  activeSorting: string | null;
  setActiveAge: (age: CategoryAgeType) => void;
  setActiveSorting: (filter: string | null) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeAge: '모두 보기',
  activeSorting: '최신순',
  setActiveAge: (age) => set({ activeAge: age }),
  setActiveSorting: (filter) => set({ activeSorting: filter }),
}));
