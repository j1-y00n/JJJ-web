import styles from '../styles/components/BestItems.module.css';
import exampleImg from '../assets/images/cars.jpg';
import StarRateIcon from '@mui/icons-material/StarRate';
import { NavLink } from 'react-router-dom';


export default function BestItems() {
  return (
    <div className={styles.best__product}>
      <div className={styles.best__product__title}>베스트 상품</div>
      <div className={styles.best__product__items}>
        <div className={styles.item__container}>
          <NavLink to='/productDetail' className={styles.item}>
            <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
            <div className={styles.item__title}>제이스랜드 출동 구조대</div>
            <div className={styles.item__desc}>
              <div className={styles.item__price}>26700원</div>
              {/* <i className='fa-solid fa-star'></i> */}
              <StarRateIcon fontSize='small' />
              <span className={styles.item__review}>(256)</span>
            </div>
          </NavLink>
        </div>

        <div className={styles.item__container}>
          <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__desc}>
            <div className={styles.item__price}>26700원</div>
            <i className='fa-solid fa-star'></i>
            <span className={styles.item__review}>(256)</span>
          </div>
        </div>
        
        <div className={styles.item__container}>
          <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__desc}>
            <div className={styles.item__price}>26700원</div>
            <i className='fa-solid fa-star'></i>
            <span className={styles.item__review}>(256)</span>
          </div>
        </div>

        <div className={styles.item__container}>
          <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__desc}>
            <div className={styles.item__price}>26700원</div>
            <i className='fa-solid fa-star'></i>
            <span className={styles.item__review}>(256)</span>
          </div>
        </div>

        <div className={styles.item__container}>
          <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__desc}>
            <div className={styles.item__price}>26700원</div>
            <i className='fa-solid fa-star'></i>
            <span className={styles.item__review}>(256)</span>
          </div>
        </div>

        <div className={styles.item__container}>
          <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__desc}>
            <div className={styles.item__price}>26700원</div>
            <i className='fa-solid fa-star'></i>
            <span className={styles.item__review}>(256)</span>
          </div>
        </div>

        <div className={styles.item__container}>
          <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__desc}>
            <div className={styles.item__price}>26700원</div>
            <i className='fa-solid fa-star'></i>
            <span className={styles.item__review}>(256)</span>
          </div>
        </div>

        <div className={styles.item__container}>
          <img src={exampleImg} alt="상품 이미지" className={styles.item__img} />
          <div className={styles.item__title}>제이스랜드 출동 구조대</div>
          <div className={styles.item__desc}>
            <div className={styles.item__price}>26700원</div>
            <i className='fa-solid fa-star'></i>
            <span className={styles.item__review}>(256)</span>
          </div>
        </div>

      </div>
    </div>
  )
}
