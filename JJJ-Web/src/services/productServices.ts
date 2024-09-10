import axios from 'axios';
import { Product, ProductImage, SliderImages } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/products`);
  return response.data;
};

export const getProductById = async (productId: number): Promise<Product> => {
  const response = await axios.get(`${LOCALHOST_PORT}/products/${productId}`);
  return response.data;
};

export const getProductImages = async (): Promise<ProductImage[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/productImages`);
  return response.data;
};

export const getProductImagesQuery = async (
  query = ''
): Promise<ProductImage[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/productImages/?${query}`);
  return response.data;
};

export const getSliderImages = async (): Promise<SliderImages[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/sliderImages`);
  return response.data;
};
