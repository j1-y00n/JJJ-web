import axios from 'axios';
import { Product, ProductImage } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(LOCALHOST_PORT);
  return response.data;
};

export const getProductById = async (productId: number): Promise<Product> => {
  const response = await axios.get(`${LOCALHOST_PORT}/${productId}`);
  return response.data;
};

export const getProductImages = async (): Promise<ProductImage[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/productImages`);
  return response.data;
};
