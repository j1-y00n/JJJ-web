import { create } from 'zustand';
import { Review } from '../types/type';

interface ReviewState {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
}

export const ReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  setReviews: (reviews) => set({ reviews }),
}));
