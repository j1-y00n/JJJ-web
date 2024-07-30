import { create } from 'zustand';
import { generateProducts, ProductProp } from '../types/TempMockdata';

interface ProductState {
  products: ProductProp[];
  setProducts: (products: ProductProp[]) => void;
}

export const ProductStore = create<ProductState>((set) => ({
  products: generateProducts(),
  setProducts: (products) => set({ products }),
}));
