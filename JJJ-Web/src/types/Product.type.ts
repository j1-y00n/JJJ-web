export type CategoryType =
  | 'gift'
  | 'intelligence'
  | 'fiveSenses'
  | 'emotion'
  | 'society';

export type AgeType = '0-6' | '7-12' | '12-18' | '19-24' | '2-3';

export interface ProductsProps {
  products: ProductProps[];
}

export interface ProductProps {
  id: number;
  title: string;
  price: number;
  category: CategoryType;
  age: AgeType;
  img: string[];
  // quantity: number;
}

const mockData: ProductProps[] = [
  {
    id: 1,
    title: '장난감',
    price: 23000,
    category: 'gift',
    age: '0-6',
    img: ['url'],
  },
  {
    id: 2,
    title: '풍선',
    price: 3000,
    category: 'emotion',
    age: '7-12',
    img: ['url'],
  },
];
