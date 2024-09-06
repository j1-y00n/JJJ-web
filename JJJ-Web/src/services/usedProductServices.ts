import axios from 'axios';
import { UsedProduct, UsedProductImage } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getUsedProducts = async (): Promise<UsedProduct[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/usedProducts`);
  return response.data;
};

export const getUsedProductImages = async (): Promise<UsedProductImage[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/usedProductImages`);
  return response.data;
};

export const deleteUsedProduct = async (id: number): Promise<void> => {
  await axios.delete(`${LOCALHOST_PORT}/usedProducts/${id}`);
};

// export const getUsedProductImagesByUsedProductId = async (
//   usedProductId: number
// ): Promise<UsedProductImage[]> => {
//   const response = await axios.get(
//     `${LOCALHOST_PORT}/usedProductImages/${usedProductId}`
//   );
//   return response.data;
// };
