// Users 테이블
export interface User {
  userId: number;
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
export interface Category {
  categoryId: number;
  categoryName: 'gift' | 'intelligence' | 'fiveSenses' | 'emotion' | 'society';
}

// AgeCategories 테이블
export interface AgeCategory {
  ageCategoryId: number;
  ageRange: '0-6' | '7-12' | '12-18' | '19-24' | '2-3' | '3세 이상';
}

// Products 테이블
export interface Product {
  productId: number;
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
  imageId: number;
  productId: number;
  imageUrl: string;
}

// Reviews 테이블
export interface Review {
  reviewId: number;
  reviewContent: string;
  reviewRating: number; // 1에서 5 사이의 값
  productId: number;
  userId: number;
}

// ReviewImages 테이블
export interface ReviewImage {
  reviewImageId: number;
  reviewId: number;
  imageUrl: string;
}

// Carts 테이블
export interface Cart {
  cartId: number;
  productId: number;
  cartQuantity: number;
  cartTotalPrice: number;
  userId: number;
}

// WishLists 테이블
export interface WishList {
  wishListId: number;
  productId: number;
  userId: number;
}

// Payments 테이블
export interface Payment {
  paymentId: number;
  paymentTimestamp: string; // ISO 날짜 문자열
  paymentTotalPrice: number;
  userId: number;
  productId: number;
  paymentQuantity: number;
}

// UsedProducts 테이블
export interface UsedProduct {
  usedProductId: number;
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
  usedProductImageId: number;
  usedProductId: number;
  imageUrl: string;
}
