// src/services/wishListService.ts
import axios from 'axios';
import { WishList } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getWishLists = async (): Promise<WishList[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/wishLists`);
  return response.data;
};

export const deleteWishList = async (id: number): Promise<void> => {
  await axios.delete(`${LOCALHOST_PORT}/wishLists/${id}`);
};

export const createWishList = async (
  wishList: Omit<WishList, 'id'>
): Promise<WishList> => {
  const response = await axios.post(`${LOCALHOST_PORT}/wishLists`, wishList);
  return response.data;
};

export const getWishListsQuery = async (query = ''): Promise<WishList[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/wishLists/?${query}`);
  return response.data;
};
