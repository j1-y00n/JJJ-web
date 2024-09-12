import { create } from 'zustand';
import { ExtendedCategoryAgeType } from '../types/type';

interface FilterState {
  activeAge: ExtendedCategoryAgeType;
  activeSorting: string | null;
  setActiveAge: (age: ExtendedCategoryAgeType) => void;
  setActiveSorting: (filter: string | null) => void;
}

export const FilterStore = create<FilterState>((set) => ({
  activeAge: '모두 보기',
  activeSorting: '리뷰많은순',
  setActiveAge: (age) => set({ activeAge: age }),
  setActiveSorting: (filter) => set({ activeSorting: filter }),
}));
