import axios from 'axios';
import { UsedProduct, UsedProductImage } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getUsedProducts = async (): Promise<UsedProduct[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/usedProducts`);
  return response.data;
};

export const getUsedProductById = async (id: number): Promise<UsedProduct> => {
  const response = await axios.get(`${LOCALHOST_PORT}/usedProducts/${id}`);
  return response.data;
};

export const getUsedProductImages = async (): Promise<UsedProductImage[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/usedProductImages`);
  return response.data;
};

export const deleteUsedProduct = async (id: number): Promise<void> => {
  await axios.delete(`${LOCALHOST_PORT}/usedProducts/${id}`);
};

export const createUsedProduct = async (
  usedProduct: Omit<UsedProduct, 'id'>
): Promise<UsedProduct> => {
  const response = await axios.post(
    `${LOCALHOST_PORT}/usedProducts`,
    usedProduct
  );
  return response.data;
};

export const updateUsedProduct = async (
  id: number,
  usedProduct: Partial<UsedProduct>
): Promise<UsedProduct> => {
  const response = await axios.patch(
    `${LOCALHOST_PORT}/usedProducts/${id}`,
    usedProduct
  );
  return response.data;
};
