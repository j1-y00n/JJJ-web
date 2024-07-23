// 신승주
import React, { useState } from 'react';
import styles from '../styles/pages/ProductDetail.module.css';
import MuiImageTabs from '../muiComponents/productDetail/LabTabs';

import StarRateIcon from '@mui/icons-material/StarRate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductDetail() {
  const [count, setCount] = useState(1);
  return (
    <div className='page__margin'>
      <div className={styles.product__container}>
        <MuiImageTabs />
        <div className={styles.detail__right}>
          <div className={styles.details}>
            <p>상품명</p>
            <p>가격</p>
            <div>
              <StarRateIcon />
              <span>4.8 (12)</span>
            </div>
          </div>
          <div className='wrapper'>
            <div className='counter'>
              <Button variant='contained'>-</Button>
              <span>{count}</span>
              <Button variant='contained'>+</Button>
            </div>
            <ShoppingCartIcon sx={{ fontSize: '50px' }} />
            <FavoriteBorderIcon />
          </div>
          <Button variant='contained'>구매하기</Button>
        </div>
      </div>
    </div>
  );
}
