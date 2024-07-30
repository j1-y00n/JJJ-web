export type CategoryType =
  | 'gift'
  | 'intelligence'
  | 'fiveSenses'
  | 'emotion'
  | 'society';

export type CategoryAgeType = '0-6' | '7-12' | '12-18' | '19-24' | '2-3';

export interface User {
  userId: number;
  userNickname: string; // 아이디
  userPassword: number;
  userName: string;
  userPhone: string;
  userEmail: string;
  userAddress: string;
  userGender?: string;
  userBirth?: Date;
}

export interface Users {
  users: User[];
}

export interface Review {
  reviewId: number;
  reviewContent: string;
  reviewRating: number;
  reviewImg: string[];
  productId: number;
  userId: number;
}

export interface Reviews {
  reviews: Review[];
}

export interface Product {
  productId: number;
  productTitle: string;
  productPrice: number;
  productCategory: CategoryType[];
  productCategoryAge: CategoryAgeType[];
  productImg: string[];
  productThumbnail: string;
  productQuantity: number;
  // productReview?: Reviews;
}

export interface Products {
  products: Product[];
}

export interface cart {
  cartId: number;
  productId: number; // 질문
  cartTotalPrice: number;
}

export interface carts {
  carts: cart[];
}

export interface wishList {
  wishListId: number;
  productId: number; // 질문
}

export interface wishLists {
  wishLists: wishList[];
}

export interface payment {
  paymentId: number;
  paymentTimestamp: Date; // 결제한 시간
  paymentTotalPrice: number;
}

export interface UsedProduct {
  usedProductId: number;
  usedProductTitle: string;
  usedProductPrice: number;
  usedProductCondition: string; // radio-value
  usedProductDetail: string;
  usedProductImg: string[];
  usedProductThumbnail: string;
  usedProductQuantity: number;
  usedProductTransaction: string; // radio-value
  usedProductIsSold: boolean;
}

export interface UsedProducts {
  usedProducts: UsedProduct[];
}

// const mockData: Products[] = [
//   {
//     id: 1,
//     title: '모래놀이',
//     price: 23000,
    // category: ['gift', 'intelligence'],
    // age: ['0-6'],
//     img: [
//       'https://cdn.pixabay.com/photo/2015/10/25/14/43/bucket-1005891_640.jpg',
//       'https://cdn.pixabay.com/photo/2015/07/22/14/37/sieve-855681_640.jpg',
//     ],
//     thumbnail:
//       'https://cdn.pixabay.com/photo/2015/07/22/14/37/sieve-855681_640.jpg',
//   },
//   {
//     id: 2,
//     title: '풍선',
//     price: 3000,
//     category: ['emotion', 'fiveSenses'],
//     age: ['7-12'],
//     img: [exampleImg2],
//   },
//   {
//     id: 3,
//     title: '퍼즐',
//     price: 15000,
//     category: ['intelligence', 'society'],
//     age: ['7-12'],
//     img: [exampleImg3],
//   },
//   {
//     id: 4,
//     title: '책',
//     price: 12000,
//     category: ['society', 'intelligence'],
//     age: ['12-18', '2-3'],
//     img: [exampleImg4],
//   },
//   {
//     id: 5,
//     title: '보드 게임',
//     price: 45000,
//     category: ['fiveSenses', 'gift'],
//     age: ['19-24', '2-3'],
//     img: [exampleImg5],
//   },
// ];
