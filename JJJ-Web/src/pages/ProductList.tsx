// 신승주
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import styles from '../styles/pages/ProductList.module.css';
import { NavLink, useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import { Product } from '../components/Product';
import { CategoryType } from '../types/Product.type';
import { useFilterStore } from '../stores/useFilter.store';
import { navigateProduct } from '../hooks/navigateProduct';
import { useProductStore } from '../stores/useProduct.store';

export default function ProductList() {
  const { products } = useProductStore();
  const { activeAge, activeSorting } = useFilterStore();
  const { categoryId } = useParams<{ categoryId: CategoryType }>();
  const { handleProductClick } = navigateProduct();

  const categoryFilteredProducts = categoryId
    ? products.filter((product) => product.productCategory.includes(categoryId))
    : products;

  const ageFilteredProducts =
    activeAge === '모두 보기'
      ? categoryFilteredProducts
      : categoryFilteredProducts.filter((product) =>
          product.productCategoryAge.includes(activeAge)
        );

  const sortedProducts = [...ageFilteredProducts].sort((a, b) => {
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

  return (
    <div className={styles.productList__container}>
      <Header />
      <Filter />
      <section className={styles.productList}>
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Product
              key={product.productId}
              imgSrc={product.productImg}
              title={product.productTitle}
              price={product.productPrice}
              rating={product.productRating}
              ratingCount={product.productRatingCount}
              onClick={() => handleProductClick(product.productId)}
            />
          ))
        ) : (
          <h3 className={styles.no__product}>No products available</h3>
        )}
      </section>
      <Footer />
      <NavLink to='/createUsedProduct'>
        <Button
          variant='contained'
          sx={{ position: 'fixed', bottom: '30px', right: '150px' }}
        >
          중고 상품 등록 +
        </Button>
      </NavLink>
    </div>
  );
}
