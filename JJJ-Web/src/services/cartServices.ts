// src/services/cartService.ts
import axios from 'axios';
import { Cart } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getCarts = async (): Promise<Cart[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/carts`);
  return response.data;
};

export const deleteCart = async (id: number): Promise<void> => {
  await axios.delete(`${LOCALHOST_PORT}/carts/${id}`);
};
