// src/services/wishListService.ts
import axios from 'axios';
import { WishList } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getWishLists = async (): Promise<WishList[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/wishLists`);
  return response.data;
};