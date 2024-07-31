// 신승주
import React, { useState } from 'react';
import styles from '../styles/pages/ProductList.module.css';
import MuiImageTabs from '../muiComponents/productDetail/MuiImageTabs';

import StarRateIcon from '@mui/icons-material/StarRate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
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

export default function ProductDetail() {
  const { products } = ProductStore();
  const { productId } = useParams();
  const selectedProduct = products.find(
    (product) => Number(product.productId) === Number(productId)
  );
  const [count, setCount] = useState(1);
  return (
    <div className={styles.productList__container}>
      <Header />
      <Container>
        {/* 이미지와, 상품정보 */}
        <Box className='whole-top' display={'flex'} gap={10} mb={10}>
          <MuiImageTabs />
          <Box
            className='detail__right'
            display={'flex'}
            p={3}
            flexDirection={'column'}
            sx={{ width: '50%' }}
          >
            <Box className='detail__top' sx={{ fontSize: 30 }}>
              <Box>{selectedProduct?.productTitle}</Box>
              <Box sx={{ color: 'error.main' }} my={5}>
                {selectedProduct?.productPrice}원
              </Box>
              <Box mb={5} display={'flex'} alignItems={'center'}>
                <StarRateIcon sx={{ color: 'warning.main' }} />
                <Box mr={2}>{selectedProduct?.productRating}</Box>
                <Box sx={{ color: 'primary.main' }}>
                  ({selectedProduct?.productRatingCount})
                </Box>
              </Box>
            </Box>
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
                <IconButton
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  <RemoveIcon sx={{ fontSize: '40px' }} />
                </IconButton>
                <TextField
                  required
                  id='outlined-required'
                  label='수량'
                  defaultValue={count}
                  sx={{
                    width: '80px',
                    margin: '0 5px',
                    color: 'primary.main',
                    '& .MuiInputBase-input': {
                      textAlign: 'center', // Center text inside the field
                    },
                  }}
                />
                <IconButton
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  <AddIcon sx={{ fontSize: '40px' }} />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.secondary',
                    marginRight: '20px',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: '50px' }} />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'primary.main',
                    },
                  }}
                >
                  <FavoriteBorderIcon sx={{ fontSize: '50px' }} />
                </IconButton>
              </Box>
            </Box>
            <Button
              className='detail__bottom'
              variant='contained'
              sx={{
                padding: '10px 0',
                fontSize: '22px',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: 'primary.main',
                },
              }}
            >
              구매하기
            </Button>
          </Box>
        </Box>

        <MuiTabBar />

        {/* 탭 : 상품 설명, 상품 리뷰, Q & A*/}
      </Container>
      <Footer />
    </div>
  );
}
