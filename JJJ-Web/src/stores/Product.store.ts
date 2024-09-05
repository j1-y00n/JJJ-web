import { create } from 'zustand';
import { getProducts } from '../services/productServices';
import { ProductWithReviews, Review } from '../types/type';
import { getReviews } from '../services/reviewServices';
import { ReviewStore } from './Review.store';

interface ProductState {
  products: ProductWithReviews[];
  fetchProducts: () => Promise<void>;
}

export const ProductStore = create<ProductState>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const products = await getProducts();
      const reviews = await getReviews();

      // 리뷰스토어에 state를 가져와서 reviews로 업데이트
      ReviewStore.getState().setReviews(reviews);

      const productsWithReviews = products.map((product) => {
        const { reviewRating, reviewCount } = calcReviewCountAndReviewRating(
          product.id,
          reviews
        );
        return {
          reviewCount,
          reviewRating,
          ...product,
        };
      });

      set({ products: productsWithReviews });
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  },
}));

function calcReviewCountAndReviewRating(productId: number, reviews: Review[]) {
  const productReviews = reviews.filter(
    (review) => Number(review.productId) === Number(productId)
  );
  const reviewCount = productReviews.length;
  const reviewRating =
    reviewCount > 0
      ? (
          productReviews.reduce(
            (acc, review) => acc + Number(review.reviewRating),
            0
          ) / reviewCount
        ).toFixed(1)
      : '0.0';

  return { reviewCount, reviewRating };
}
