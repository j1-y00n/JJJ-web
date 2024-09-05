import axios from 'axios';
import { Review, ReviewImage } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getReviews = async (): Promise<Review[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/reviews`);
  return response.data;
};

// export const getReviewId = async (id: number): Promise<Review> => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

export const getReviewImages = async (): Promise<ReviewImage[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/reviewImages`);
  return response.data;
};
