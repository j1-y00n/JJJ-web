// 신승주
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import styles from '../styles/pages/ProductList.module.css';
import { NavLink, useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import { Product } from '../components/Product';
import { CategoryType } from '../types/Product.type';
import { useFilterStore } from '../stores/Filter.store';
import { navigateProduct } from '../utils/navigateProduct';
import { ProductStore } from '../stores/Product.store';
import { filterAndSortProducts } from '../utils/filterAndSortProducts';

export default function ProductList() {
  const { products } = ProductStore();
  const { activeAge, activeSorting } = useFilterStore();
  const { categoryId } = useParams<{ categoryId: CategoryType }>();
  const { handleProductClick } = navigateProduct();
  const categoryFilteredProducts = categoryId
    ? products.filter((product) => product.productCategory.includes(categoryId))
    : products;

  const sortedProducts = filterAndSortProducts({
    products: categoryFilteredProducts,
    activeAge,
    activeSorting,
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
              onClick={() => handleProductClick(product.productId, categoryId)}
            />
          ))
        ) : (
          <div className={styles.no__product}>
            <h3>이용 가능한 상품이 없습니다</h3>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
