// 신승주
import StarRateIcon from '@mui/icons-material/StarRate';
import { NavLink } from 'react-router-dom';
import styles from '../styles/components/Product.module.css';

interface ProductProps {
  imgSrc: string;
  title: string;
  price: number;
  rating: number;
  ratingCount: number;
  onClick: () => void;
}

export function Product({
  imgSrc,
  title,
  price,
  rating,
  ratingCount,
  onClick,
}: ProductProps) {
  return (
    <div className={styles.item__container} onClick={onClick}>
      <img src={imgSrc} alt={title} className={styles.item__img} />
      <div className={styles.item__descriptions}>
        <div className={styles.item__title}>{title}</div>
        <div className={styles.item__infos}>
          <div className={styles.item__price}>{price.toLocaleString()}원</div>
          <div className={styles.rating__star__container}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, index) => (
                <StarRateIcon
                  key={index}
                  fontSize='small'
                  sx={{
                    margin: '0 -1.4px',
                    color:
                      index < rating
                        ? 'var(--color-orange)'
                        : 'var(--color-blue-light)',
                  }}
                />
              ))}
            </div>
            <div className={styles.rating__count}>({ratingCount})</div>
          </div>
        </div>
      </div>
    </div>
  );
}
