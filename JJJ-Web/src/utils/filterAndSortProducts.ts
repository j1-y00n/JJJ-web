import { CategoryAgeType, ProductProp } from '../types/TempMockdata';

interface FilterAndSortParams {
  products: ProductProp[];
  activeAge: CategoryAgeType;
  activeSorting: string | null;
}

export function filterAndSortProducts({
  products,
  activeAge,
  activeSorting,
}: FilterAndSortParams): ProductProp[] {
  const ageFilteredProducts =
    activeAge === '모두 보기'
      ? products
      : products.filter((product) =>
          product.productCategoryAge.includes(activeAge)
        );

  return [...ageFilteredProducts].sort((a, b) => {
    switch (activeSorting) {
      case '최신순':
        return b.productId - a.productId;
      case '가격높은순':
        return b.productPrice - a.productPrice;
      case '가격낮은순':
        return a.productPrice - b.productPrice;
      case '별점순':
        return b.productRating - a.productRating;
      case '리뷰많은순':
        return b.productRatingCount - a.productRatingCount;
      default:
        return 0;
    }
  });
}
