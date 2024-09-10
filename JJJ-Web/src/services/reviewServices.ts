import axios from 'axios';
import { Review, ReviewImage } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getReviews = async (): Promise<Review[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/reviews`);
  return response.data;
};

export const DeleteReview = async (id: number): Promise<void> => {
  await axios.delete(`${LOCALHOST_PORT}/reviews/${id}`);
};

export const getReviewImages = async (): Promise<ReviewImage[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/reviewImages`);
  return response.data;
};

export const createReview = async (
  review: Omit<Review, 'id'>
): Promise<void> => {
  await axios.post(`${LOCALHOST_PORT}/reviews`, review);
};

export const getReviewQuery = async (query = ''): Promise<Review[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/reviews/?${query}`);
  return response.data;
};
