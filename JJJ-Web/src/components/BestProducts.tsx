import styles from '../styles/components/BestProducts.module.css';
import { navigateProduct } from '../utils/navigateProduct';
import BestProduct from '../assets/images/bestProduct.png';
import BestReview from '../assets/images/bestReview.png';
import { useEffect } from 'react';
import { ProductStore } from '../stores/Product.store';
import { Product } from './Product';
import { ReviewStore } from '../stores/Review.store';

export default function BestProducts() {
  const { products } = ProductStore();

  const BestProducts = products
    .sort((a, b) => b.productSalesCount - a.productSalesCount)
    .slice(0, 8);

  const BestReviewProducts = products
    .filter((product) => Number(product.reviewRating) >= 4)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 4);

  const { handleProductClick } = navigateProduct();

  return (
    <div className={styles.best__product}>
      <div className={styles.best__product__container}>
        <div className={styles.best__product__img}>
          <img src={BestProduct} alt='BestProduct' />
        </div>
        <div className={styles.best__product__items}>
          {BestProducts.map((product) => {
            return (
              <Product
                key={product.id}
                productThumbnail={product.productThumbnail}
                productTitle={product.productTitle}
                productPrice={product.productPrice}
                reviewRating={product.reviewRating}
                reviewCount={product.reviewCount}
                onClick={() => handleProductClick(product.id)}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.best__product__container}>
        <div className={styles.best__product__img}>
          <img src={BestReview} alt='BestReview' />
        </div>
        <div className={styles.best__product__items}>
          {BestReviewProducts.map((product) => {
            return (
              <Product
                key={product.id}
                productThumbnail={product.productThumbnail}
                productTitle={product.productTitle}
                productPrice={product.productPrice}
                reviewRating={product.reviewRating}
                reviewCount={product.reviewCount}
                onClick={() => handleProductClick(product.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
