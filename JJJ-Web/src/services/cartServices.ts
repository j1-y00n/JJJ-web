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

export const createCartProduct = async (
  cart: Omit<Cart, 'id'>
): Promise<Cart> => {
  const response = await axios.post(`${LOCALHOST_PORT}/carts`, cart);
  return response.data;
};

export const updateCartProduct = async (
  updateCart: Cart | Partial<Cart>,
  id?: number
): Promise<Cart> => {
  const cartId = id ?? updateCart.id; // id가 없으면 updateCart에서 id 추출
  if (!cartId) {
    throw new Error("Cart ID is required.");
  }

  const response = await axios.put(`${LOCALHOST_PORT}/carts/${cartId}`, updateCart);
  return response.data;
};

export const getCartById = async (id: number): Promise<Cart> => {
  const response = await axios.get(`${LOCALHOST_PORT}/carts/${id}`);
  return response.data;
};