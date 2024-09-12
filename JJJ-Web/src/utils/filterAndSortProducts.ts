import { useEffect, useState } from 'react';
import {
  ProductWithReviews,
  ExtendedCategoryAgeType,
  ProductAgeCategory,
  AgeCategory,
} from '../types/type';
import {
  getAgeCategories,
  getProductAgeCategory,
} from '../services/categoryServices';

interface FilterAndSortParams {
  products: ProductWithReviews[];
  activeAge: ExtendedCategoryAgeType;
  activeSorting: string | null;
}

export function filterAndSortProducts({
  products,
  activeAge,
  activeSorting,
}: FilterAndSortParams): ProductWithReviews[] {
  const [ageCategories, setAgeCategories] = useState<AgeCategory[]>();
  const [productAgeCategories, setProductAgeCategories] =
    useState<ProductAgeCategory[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ageCategories = await getAgeCategories();
        const productAgeCategory = await getProductAgeCategory();
        setAgeCategories(ageCategories);
        setProductAgeCategories(productAgeCategory);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchData();
  }, []);

  const ageCategoryId =
    activeAge === '모두 보기'
      ? null
      : ageCategories?.find((ac) => ac.ageRange === activeAge)?.id;

  const ageFilteredProducts = ageCategoryId
    ? products.filter((product) =>
        productAgeCategories?.some(
          (pac) =>
            String(pac.productId) === String(product.id) &&
            String(pac.ageCategoryId) === String(ageCategoryId)
        )
      )
    : products;

  const sortedProducts = [...ageFilteredProducts].sort((a, b) => {
    switch (activeSorting) {
      case '리뷰많은순':
        return b.reviewCount - a.reviewCount;
      case '판매량순':
        return a.productSalesCount - b.productSalesCount;
      case '별점순':
        return Number(b.reviewRating) - Number(a.reviewRating);
      case '가격높은순':
        return b.productPrice - a.productPrice;
      case '가격낮은순':
        return a.productPrice - b.productPrice;
      case '최신순':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return sortedProducts;
}
