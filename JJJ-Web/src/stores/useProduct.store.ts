import { create } from 'zustand';
import { generateProducts, Product } from '../types/TempMockdata';

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: generateProducts(),
  setProducts: (products) => set({ products }),
}));
