// 신승주
import React, { useState } from 'react';
import styles from '../styles/pages/ProductDetail.module.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, IconButton, Tab, Tabs, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { ProductStore } from '../stores/Product.store';
import { useCounter } from '../hooks/useCounter';
import useActiveState from '../hooks/useActiveState';
import img01 from '../assets/images/exam01.jpg';
import img02 from '../assets/images/exam02.jpg';
import img03 from '../assets/images/exam03.jpg';
import img04 from '../assets/images/balloon.jpg';
import img05 from '../assets/images/boardgame.jpg';
import ImageTab from '../components/ImageTab';
// 상품 설명 디테일 사진
import desc01 from '../assets/images/productDescription/desc01.jpeg';
import desc02 from '../assets/images/productDescription/desc02.jpeg';
import desc03 from '../assets/images/productDescription/desc03.jpeg';
import desc04 from '../assets/images/productDescription/desc04.jpeg';

const images = [img01, img02, img03, img04, img05];

export default function ProductDetail() {
  const { products } = ProductStore();
  const { productId } = useParams();
  const selectedProduct = products.find(
    (product) => Number(product.productId) === Number(productId)
  );
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
  const { activeState, handleStateChange, handleToggle } = useActiveState(true);

  const [currentImg, setCurrentImg] = useState(img01);
  const handleImgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.target as HTMLImageElement;
    if (!value.src) {
      return;
    }
    setCurrentImg(value.src);
  };

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
    <div className='flex__container'>
      <Header />
      <div className={styles.productDetail}>
        <div className={styles.detail__container}>
          <ImageTab
            images={images}
            currentImg={currentImg}
            handleImgClick={handleImgClick}
          />
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
                    fontSize: 'var(--font-size-medium)',
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
                    width: '60px',
                    margin: '0 10px',
                    '& .MuiInputBase-input': {
                      padding: '10px 0',
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
            <Button sx={{ fontSize: 'var(--font-size-regular)' }}>
              구매하기
            </Button>
          </div>
        </div>
        <DetailTab />
      </div>
      <Footer />
    </div>
  );
}

// 장바구니 - 모달창 만들어야함
interface CartModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}
export function CartModal({ isOpen, handleCloseModal }: CartModalProps) {
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

// 여기 아래 코드는 전부 DetailTab을 위한 코드
const detailDescriptions = [desc01, desc02, desc03, desc04];
const randomIndex = Math.floor(Math.random() * detailDescriptions.length);
const randomDescImg = detailDescriptions[randomIndex];

function DetailTab() {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        width: '100%',
        margin: '50px 0',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          position: 'sticky',
          top: 'var(--box-height)',
          backgroundColor: 'var(--color-white)',
        }}
      >
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label='basic tabs'
          textColor='primary'
          centered
          variant='fullWidth'
          sx={{
            '& .MuiTab-root': {
              height: '60px',
              '&:hover': {
                color: 'var(--color-blue)',
              },
            },
          }}
        >
          <Tab label='상품 설명' {...a11yProps(0)} />
          <Tab label='상품 리뷰' {...a11yProps(1)} />
          <Tab label='Q & A' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <img src={randomDescImg} alt={`desc${randomIndex}`} />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Box>하하</Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box>하하</Box>
      </CustomTabPanel>
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      id={`simple-tabpanel-${index}`}
      role='tabpanel'
      hidden={value !== index}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3, display: 'flex', flexWrap: 'wrap' }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
