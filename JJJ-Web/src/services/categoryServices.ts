import axios from 'axios';
import {
  Category,
  AgeCategory,
  ProductCategory,
  ProductAgeCategory,
} from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/categories`);
  return response.data;
};

export const getProductCategories = async (): Promise<ProductCategory[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/productCategories`);
  return response.data;
};

export const getAgeCategories = async (): Promise<AgeCategory[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/ageCategories`);
  return response.data;
};

export const getProductAgeCategory = async (): Promise<
  ProductAgeCategory[]
> => {
  const response = await axios.get(`${LOCALHOST_PORT}/productAgeCategories`);
  return response.data;
};
