// 신승주
import React, { useState } from 'react';
import MuiImageTabs from '../muiComponents/productDetail/MuiImageTabs';
import styles from '../styles/pages/ProductDetail.module.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Container, IconButton, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import MuiTabBar from '../muiComponents/productDetail/MuiTabBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { ProductStore } from '../stores/Product.store';
import { useCounter } from '../hooks/useCounter';
import useActiveState from '../hooks/useActiveState';

export default function ProductDetail() {
  const { products } = ProductStore();
  const { productId } = useParams();
  const selectedProduct = products.find(
    (product) => Number(product.productId) === Number(productId)
  );
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
  const { activeState, handleStateChange, handleToggle } = useActiveState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거

    if (numericValue === '') {
      setCounter(0); // 빈 문자열일 경우 0으로 설정
    } else {
      setCounter(Number(numericValue));
    }
  };

  // 포커스 잃을 때 유효성 검사
  const handleBlur = () => {
    if (count < 1) {
      setCounter(1); // 숫자가 1보다 작으면 1로 고정
    }
  };

  return (
    <div className='flex__container'>
      <Header />
      <div className={styles.productDetail}>
        {/* 이미지와, 상품정보 */}
        <div className={styles.detail__container}>
          <MuiImageTabs />
          <div className={styles.detail__right}>
            <div className={styles.product__info}>
              <div>{selectedProduct?.productTitle} </div>
              <div className={styles.product__price}>
                {selectedProduct?.productPrice}원
              </div>
              <div className={styles.product__rating}>
                <StarRateIcon sx={{ color: 'var(--color-orange)' }} />
                <h3>{selectedProduct?.productRating}</h3>
                <p>({selectedProduct?.productRatingCount})</p>
              </div>
            </div>
            <Box
              className='detail__middle'
              display={'flex'}
              justifyContent={'space-between'}
              py={5}
              mb={5}
              sx={{
                borderTop: 1,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <Box
                className='counter'
                component='form'
                noValidate
                autoComplete='off'
                display={'flex'}
                alignItems={'center'}
                sx={{ width: '50%' }}
              >
                <IconButton className='round' onClick={decreaseCounter}>
                  <RemoveIcon sx={{ fontSize: '30px' }} />
                </IconButton>
                <TextField
                  id='outlined'
                  type='text'
                  label='수량'
                  value={count}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  sx={{
                    width: '80px',
                    margin: '0 5px',
                    '& .MuiInputBase-input': {
                      textAlign: 'center', // Center text inside the field
                    },
                  }}
                />
                <IconButton className='round' onClick={increaseCounter}>
                  <AddIcon sx={{ fontSize: '30px' }} />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  className='round nest__icons'
                  sx={{
                    marginRight: '20px',
                  }}
                >
                  <ShoppingCartOutlinedIcon className='default font__large' />
                  <ShoppingCartIcon className='show font__large' />
                </IconButton>
                <IconButton
                  className='round nest__icons'
                  onClick={handleToggle}
                >
                  <FavoriteBorderIcon className='default font__large' />
                  <FavoriteIcon
                    className={`show font__large ${
                      activeState ? 'active' : ''
                    }`}
                  />
                </IconButton>
              </Box>
            </Box>
            <Button className='detail__bottom'>구매하기</Button>
          </div>
        </div>

        <MuiTabBar />

        {/* 탭 : 상품 설명, 상품 리뷰, Q & A*/}
      </div>
      <Footer />
    </div>
  );
}

// 장바구니 - 모달창 만들어야함
// 찜 - 클릭시 active 필요함
// css 통일 작업
