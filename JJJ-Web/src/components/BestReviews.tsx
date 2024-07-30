// 신승주
import styles from '../styles/components/BestReviews.module.css';
import { Product } from './Product';
import { navigateProduct } from '../hooks/navigateProduct';
import { useProductStore } from '../stores/useProduct.store';

export default function BestReviews() {
  const { products } = useProductStore();

  const BestReviewProducts = products
    .sort((a, b) => b.productRatingCount - a.productRatingCount)
    .slice(0, 4);

  const { handleProductClick } = navigateProduct();
  return (
    <section className={styles.best__reviews}>
      <h3 className={styles.best__reviews__title}>베스트 리뷰</h3>
      <div className={styles.best__reviews__items}>
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
    </section>
  );
}
