import exampleImg from '../assets/images/cars.jpg';
import styles from '../styles/components/BestReview.module.css';
export default function BestReview() {
  return (
    <div className='item__container'>
      <a href='#' className={styles.item}>
        <img src={exampleImg} alt='item' className={styles.item__img} />
        <div className={styles.item__descriptions}>
          <div className='item__name'>제이스랜드 출동 구조대</div>
          <div className={styles.item__infos}>
            <div className={styles.item__price}>26,700원</div>
            <div className={styles.rating__star__container}>
              <div className={styles.stars}>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
              </div>
              <div className={styles.rating__count}>(256)</div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
