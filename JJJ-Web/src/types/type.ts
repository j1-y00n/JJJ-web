// Users 테이블
export interface User {
  id: number;
  userLoginId: string;
  userPassword: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  userAddress: string;
  userAddressDetail?: string; // 선택적 필드
  userGender: 'male' | 'female' | 'other';
  userBirth?: string; // 선택적 필드 (ISO 날짜 문자열)
  userSignUpDate: string; // ISO 날짜 문자열
  userWithdrawDate?: string; // 선택적 필드 (ISO 날짜 문자열)
}

// Categories 테이블
export type categoryNameType =
  | 'gift'
  | 'intelligence'
  | 'fiveSenses'
  | 'emotion'
  | 'society';

export interface Category {
  id: number;
  categoryName: categoryNameType;
}

// AgeCategories 테이블
export type ageRangeType =
  | '0-6'
  | '7-12'
  | '12-18'
  | '19-24'
  | '2-3'
  | '3세 이상';

export type ExtendedCategoryAgeType = ageRangeType | '모두 보기';

export interface AgeCategory {
  id: number;
  ageRange: ageRangeType;
}

// Products 테이블
export interface Product {
  id: number;
  productTitle: string;
  productPrice: number;
  productThumbnail: string;
  productStock: number;
  productSalesPrice?: number; // 선택적 필드
  productSalesCount: number;
}

// ProductCategories 테이블
export interface ProductCategory {
  id: number;
  productId: number;
  categoryId: number;
}

// ProductAgeCategories 테이블
export interface ProductAgeCategory {
  id: number;
  productId: number;
  ageCategoryId: number;
}

// ProductImages 테이블
export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
}

export interface ProductWithReviews extends Product {
  reviewRating: string;
  reviewCount: number;
}

// Reviews 테이블
export interface Review {
  id: number;
  reviewContent: string;
  reviewRating: number;
  productId: number;
  userId: number;
}

export interface ReviewImage {
  id: number;
  reviewId: number;
  imageUrl: string;
}

// Carts 테이블
export interface Cart {
  id: number;
  productId: number;
  cartQuantity: number;
  cartTotalPrice: number;
  userId: number;
}

// WishLists 테이블
export interface WishList {
  id: number;
  productId: number;
  userId: number;
}

// Payments 테이블
export interface Payment {
  id: number;
  paymentTimestamp: string; // ISO 날짜 문자열
  paymentTotalPrice: number;
  userId: number;
  productId: number;
  paymentQuantity: number;
}

// UsedProducts 테이블
export interface UsedProduct {
  id: number;
  usedProductTitle: string;
  usedProductPrice: number;
  usedProductCondition: string;
  usedProductDetail: string;
  usedProductThumbnail: string;
  usedProductQuantity: number;
  usedProductTransaction: string;
  usedProductIsSold: boolean;
  userId?: number; // 사용자가 삭제되면 null일 수 있음
}

// UsedProductImages 테이블
export interface UsedProductImage {
  id: number;
  usedProductId: number;
  imageUrl: string;
}
