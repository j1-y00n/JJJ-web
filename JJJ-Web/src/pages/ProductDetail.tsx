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
import { FixedStore } from '../stores/Fixed.store';

export default function ProductDetail() {
  const { products } = ProductStore();
  const { isFixed } = FixedStore();
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

  // 장바구니 모달
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddToCart = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={`flex__container ${isFixed ? 'fixed' : ''}`}>
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
                <StarRateIcon
                  sx={{
                    color: 'var(--color-orange)',
                    fontSize: 'var(--font-size-large)',
                  }}
                />
                <h3>{selectedProduct?.productRating}</h3>
                <p>({selectedProduct?.productRatingCount})</p>
              </div>
            </div>
            <div className={styles.detail__actions}>
              <Box
                component='form'
                noValidate
                autoComplete='off'
                sx={{ width: '50%', display: 'flex', alignItems: 'center' }}
              >
                <IconButton className='round' onClick={decreaseCounter}>
                  <RemoveIcon className='font__large' />
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
                      textAlign: 'center',
                    },
                  }}
                />
                <IconButton className='round' onClick={increaseCounter}>
                  <AddIcon className='font__large' />
                </IconButton>
              </Box>
              <div className={styles.actions__container}>
                <IconButton
                  className='round nest__icons'
                  onClick={handleAddToCart}
                  sx={{
                    marginRight: '20px',
                  }}
                >
                  {/* 장바구니 모달 */}
                  <CartModal
                    isOpen={isModalOpen}
                    handleCloseModal={handleCloseModal}
                  />
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
              </div>
            </div>
            <Button>구매하기</Button>
          </div>
        </div>
        {/* 탭 : 상품 설명, 상품 리뷰, Q & A*/}
        <MuiTabBar />
      </div>
      <Footer />
    </div>
  );
}

// 장바구니 - 모달창 만들어야함
// 찜 - 클릭시 active 필요함
// css 통일 작업
interface CartModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}
function CartModal({ isOpen, handleCloseModal }: CartModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal__overlay} onClick={handleCloseModal}>
      <div className={styles.modal}>
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>장바구니에 담겼습니다</h2>
          <Button onClick={handleCloseModal} sx={{ padding: '5px 10px' }}>
            닫기
          </Button>
        </div>
        <div className={styles.arrow}></div>
      </div>
    </div>
  );
}
