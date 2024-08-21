import { shuffle } from 'fast-shuffle';
import exampleImg1 from '../assets/images/cars.jpg';
import exampleImg2 from '../assets/images/balloon.jpg';
import exampleImg3 from '../assets/images/boardgame.jpg';
import exampleImg4 from '../assets/images/book.jpg';
import exampleImg5 from '../assets/images/exam01.jpg';
import exampleImg6 from '../assets/images/exam02.jpg';
import exampleImg7 from '../assets/images/exam03.jpg';
import exampleImg8 from '../assets/images/puzzle.jpg';

const imagePaths = [
  exampleImg1,
  exampleImg2,
  exampleImg3,
  exampleImg4,
  exampleImg5,
  exampleImg6,
  exampleImg7,
  exampleImg8,
];

export interface UsedProductProp {
  usedImgSrc: string[];
  usedThumbImg: string;
  usedTitle: string;
  usedStatus: string;
  usedDescription: string;
  usedPrice: number;
  usedCount: number;
  usedMethod: string;
}

const conditions = [
  '새 제품 (미사용)',
  '사용감 없음',
  '사용감 적음',
  '사용감 많음',
  '고장/파손 제품',
];

const transactionMethods = ['가능', '불가능'];

const descriptions = [
  '이것은 고품질 아이템입니다.',
  '제품 상태가 매우 좋습니다.',
  '일상적으로 사용하기에 좋습니다.',
  '내구성이 뛰어나고 신뢰할 수 있습니다.',
  '한정된 재고만 남아있습니다.',
  '거의 사용하지 않았고 잘 관리되었습니다.',
  '꼭 가져야 할 아이템입니다!',
  '수집가에게 완벽한 제품입니다.',
  '빠르게 판매하기 위해 가격이 책정되었습니다. 빠르게 빠르게 판매하기빠르게 판매하기판매하기 위해 가격이 책정되었습니기 위해 가격이 책정되었습니정되었습니정',
];

// 랜덤 숫자 뽑기
const getRandomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// 4개의 랜덤 이미지와 1개의 thumb 이미지 생성
const getRandomImages = (): { thumbImg: string; imgSrc: string[] } => {
  const shuffledImages = shuffle(imagePaths);
  const thumbImg = shuffledImages[0];
  const imgSrc = shuffledImages.slice(1, 5);
  return { thumbImg, imgSrc };
};

// 랜덤 상태, 거래 방법, 설명 생성
const getRandomCondition = () =>
  conditions[getRandomInt(0, conditions.length - 1)];
const getRandomTransactionMethod = () =>
  transactionMethods[getRandomInt(0, transactionMethods.length - 1)];
const getRandomDescription = () => {
  const shuffledDescriptions = shuffle(descriptions);
  return shuffledDescriptions.slice(0, 3).join(' ');
};

export const usedProductTitles = [
  '스콧앤라이드 킥보드',
  '건설 중장비세트 장난감 건설 중장비세',
  '유아용 자전거',
  '추피책',
  '원목장난감',
  '베이비브레짜',
  '아기 미끄럼틀',
  '펭귄 변기통',
  '핑크퐁 낚시놀이',
];

export const generateUsedProducts = (): UsedProductProp[] => {
  const usedProducts: UsedProductProp[] = [];

  for (let i = 0; i < usedProductTitles.length; i++) {
    const { thumbImg, imgSrc } = getRandomImages();

    const usedProduct: UsedProductProp = {
      usedTitle: usedProductTitles[i % usedProductTitles.length],
      usedPrice: getRandomInt(3000, 100000),
      usedStatus: getRandomCondition(),
      usedDescription: getRandomDescription(),
      usedCount: getRandomInt(1, 5),
      usedMethod: getRandomTransactionMethod(),
      usedThumbImg: thumbImg,
      usedImgSrc: imgSrc,
    };

    usedProducts.push(usedProduct);
  }

  return usedProducts;
};
