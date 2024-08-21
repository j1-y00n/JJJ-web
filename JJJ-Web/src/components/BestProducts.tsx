import styles from '../styles/components/BestProducts.module.css';
import { ProductStore } from '../stores/Product.store';
import { Product } from './Product';
import { navigateProduct } from '../utils/navigateProduct';
import BestProduct from '../assets/images/bestProduct.png';
import BestReview from '../assets/images/bestReview.png';

export default function BestProducts() {
  const { products } = ProductStore();

  const BestProducts = products
    .sort((a, b) => b.productId - a.productId)
    .slice(0, 8);

  const BestReviewProducts = products
    .sort((a, b) => b.productRatingCount - a.productRatingCount)
    .slice(0, 4);

  const { handleProductClick } = navigateProduct();
  return (
    <>
      <div className={styles.best__product}>
        <div className={styles.best__product__container}>
          <div className={styles.best__product__img}>
            <img src={BestProduct} alt='BestProduct' />
          </div>
          <div className={styles.best__product__items}>
            {BestProducts.map((product) => (
              <Product
                key={product.productId}
                imgSrc={product.productImg}
                title={product.productTitle}
                price={product.productPrice}
                rating={product.productRating}
                ratingCount={product.productRatingCount}
                onClick={() => handleProductClick(product.productId)}
              />
            ))}
          </div>
        </div>
        <div className={styles.best__product__container}>
          <div className={styles.best__product__img}>
            <img src={BestReview} alt='BestReview' />
          </div>
          <div className={styles.best__product__items}>
            {BestReviewProducts.map((product) => (
              <Product
                key={product.productId}
                imgSrc={product.productImg}
                title={product.productTitle}
                price={product.productPrice}
                rating={product.productRating}
                ratingCount={product.productRatingCount}
                onClick={() => handleProductClick(product.productId)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
