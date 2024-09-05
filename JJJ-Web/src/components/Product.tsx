// 신승주
import StarRateIcon from '@mui/icons-material/StarRate';
import styles from '../styles/components/Product.module.css';

interface ProductProps {
  productThumbnail: string;
  productTitle: string;
  productPrice: number;
  reviewRating: string;
  reviewCount: number;
  onClick: () => void;
}

export function Product({
  productThumbnail,
  productTitle,
  productPrice,
  reviewRating,
  reviewCount,
  onClick,
}: ProductProps) {
  return (
    <div className={styles.item__container} onClick={onClick}>
      <img
        src={productThumbnail}
        alt={productTitle}
        className={styles.item__img}
      />
      <div className={styles.item__descriptions}>
        <div className={styles.item__title}>{productTitle}</div>
        <div className={styles.item__infos}>
          <div className={styles.item__price}>
            {productPrice.toLocaleString()}원
          </div>
          <div className={styles.rating__star__container}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, index) => (
                <StarRateIcon
                  key={index}
                  fontSize='small'
                  sx={{
                    margin: '0 -1.4px',
                    color:
                      index < Number(reviewRating)
                        ? 'var(--color-orange)'
                        : 'var(--color-blue-light)',
                  }}
                />
              ))}
            </div>
            <div className={styles.rating__count}>({reviewCount})</div>
          </div>
        </div>
      </div>
    </div>
  );
}
