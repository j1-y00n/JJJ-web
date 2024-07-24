import exampleImg1 from '../assets/images/cars.jpg';
import exampleImg2 from '../assets/images/balloon.jpg';
import exampleImg3 from '../assets/images/puzzle.jpg';
import exampleImg4 from '../assets/images/book.jpg';
import exampleImg5 from '../assets/images/boardgame.jpg';

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
  category: CategoryType[];
  age: AgeType[];
  img: string[];
  // quantity: number;
}

const mockData: ProductProps[] = [
  {
    id: 1,
    title: '장난감',
    price: 23000,
    category: ['gift', 'intelligence'],
    age: ['0-6'],
    img: [exampleImg1],
  },
  {
    id: 2,
    title: '풍선',
    price: 3000,
    category: ['emotion', 'fiveSenses'],
    age: ['7-12'],
    img: [exampleImg2],
  },
  {
    id: 3,
    title: '퍼즐',
    price: 15000,
    category: ['intelligence', 'society'],
    age: ['7-12'],
    img: [exampleImg3],
  },
  {
    id: 4,
    title: '책',
    price: 12000,
    category: ['society', 'intelligence'],
    age: ['12-18', '2-3'],
    img: [exampleImg4],
  },
  {
    id: 5,
    title: '보드 게임',
    price: 45000,
    category: ['fiveSenses', 'gift'],
    age: ['19-24', '2-3'],
    img: [exampleImg5],
  },
];
