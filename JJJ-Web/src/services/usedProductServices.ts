import axios from 'axios';
import { UsedProduct, UsedProductImage } from '../types/type';

const API_URL = 'http://localhost:5005';

export const getUsedProducts = async (): Promise<UsedProduct[]> => {
  const response = await axios.get(`${API_URL}/usedProducts`);
  return response.data;
};

export const getUsedProductImages = async (): Promise<UsedProductImage[]> => {
  const response = await axios.get(`${API_URL}/usedProductImages`);
  return response.data;
};

// export const getUsedProductImagesByUsedProductId = async (
//   usedProductId: number
// ): Promise<UsedProductImage[]> => {
//   const response = await axios.get(
//     `${API_URL}/usedProductImages/${usedProductId}`
//   );
//   return response.data;
// };
