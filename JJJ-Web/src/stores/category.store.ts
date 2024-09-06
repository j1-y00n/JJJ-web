import create from 'zustand';
import {
  getCategories,
  getProductCategories,
} from '../services/categoryServices';
import { Category, ProductCategory } from '../types/type';

interface CategoryState {
  categories: Category[];
  productCategories: ProductCategory[];
  fetchCategories: () => Promise<void>;
  fetchProductCategories: () => Promise<void>;
}

export const CategoryStore = create<CategoryState>((set) => ({
  categories: [],
  productCategories: [],
  fetchCategories: async () => {
    try {
      const categories = await getCategories();
      set({ categories });
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  },
  fetchProductCategories: async () => {
    try {
      const productCategories = await getProductCategories();
      set({ productCategories });
    } catch (error) {
      console.error('Failed to fetch product categories:', error);
    }
  },
}));
