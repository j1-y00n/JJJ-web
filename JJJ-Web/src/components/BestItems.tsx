//변지윤
import styles from '../styles/components/BestItems.module.css';
import exampleImg from '../assets/images/cars.jpg';
import StarRateIcon from '@mui/icons-material/StarRate';
import { NavLink } from 'react-router-dom';
import { ProductStore } from '../stores/Product.store';
import { Product } from './Product';
import { navigateProduct } from '../utils/navigateProduct';

export default function BestItems() {
  const { products } = ProductStore();

  const BestReviewProducts = products
    .sort((a, b) => b.productId - a.productId)
    .slice(0, 8);

  const { handleProductClick } = navigateProduct();
  return (
    <div className={styles.best__product}>
      <div className={styles.best__product__title}>베스트 상품</div>
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
  );
}
