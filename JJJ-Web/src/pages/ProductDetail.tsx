import React, { useState } from 'react';
import ImageTabs from '../muiComponents/productDetail/LabTabs';

import StarRateIcon from '@mui/icons-material/StarRate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function ProductDetail() {
  const [count, setCount] = useState(1);
  return (
    <div className='page__margin'>
      <ImageTabs />
      <div>
        <div className='details'>
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
  );
}
