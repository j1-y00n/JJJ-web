import exampleImg from '../assets/images/cars.jpg';
import StarRateIcon from '@mui/icons-material/StarRate';
import styles from '../styles/components/BestReview.module.css';
import { Scale } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
export default function BestReview() {
  return (
    <div className={styles.item__container}>
      <NavLink to='/productDetail' className={styles.item}>
        <img src={exampleImg} alt='item' className={styles.item__img} />
        <div className={styles.item__descriptions}>
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__infos}>
            <div className={styles.item__price}>26,700원</div>
            <div className={styles.rating__star__container}>
              <div className={styles.stars}>
                <StarRateIcon fontSize='small' />
                <StarRateIcon fontSize='small' />
                <StarRateIcon fontSize='small' />
                <StarRateIcon fontSize='small' />
                <StarRateIcon fontSize='small' />
              </div>
              <div className={styles.rating__count}>(256)</div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
