// 신승주
import React, { useState } from 'react';
import styles from '../styles/pages/ProductDetail.module.css';
import StarRateIcon from '@mui/icons-material/StarRate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, IconButton, Tab, Tabs, TextField } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useOpenModal } from '../hooks/useOpenModal';
import { ModalCart } from '../components/ModalCart';
import ModalIsDelete from '../components/ModalIsDelete';
const images = [img01, img02, img03, img04, img05];

export default function ProductDetail() {
  const { products } = ProductStore();
  const { productId } = useParams();
  const selectedProduct = products.find(
    (product) => Number(product.productId) === Number(productId)
  );
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
  const { activeState, handleStateChange, handleToggle } = useActiveState(true);
  const navigate = useNavigate();

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
  const { isOpen, handleOpenModal, handleCloseModal } = useOpenModal();
  const customPosition = { left: 23, top: -10 };

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
                {/* 장바구니 모달 */}
                <ModalCart
                  isOpen={isOpen}
                  handleCloseModal={handleCloseModal}
                  cartModalStyles={customPosition}
                />
                <IconButton
                  className='round nest__icons'
                  onClick={handleOpenModal}
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
              </div>
            </div>
            <Button
              onClick={() => navigate('/payment')}
              sx={{ fontSize: 'var(--font-size-regular)' }}
            >
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
        <Box sx={{ width: '100%' }}>
          <Review />
          <Review />
          <Review />
          {/* 리뷰가 없을 때 */}
          {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            등록된 리뷰가 없습니다.
          </Box> */}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            등록된 문의가 없습니다.
          </Box>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}

function Review() {
  const userId = 'userId1234';
  // 로그인된 사용자의 리뷰에만 삭제 버튼이 보이도록 해야 함

  // 삭제 모달
  const isDelete = useOpenModal();

  return (
    <div className={styles.review}>
      <div className={styles.review__id}>
        <div>{userId}</div>
        {userId && (
          <IconButton
            onClick={isDelete.handleOpenModal}
            sx={{ padding: '5px' }}
          >
            <ClearIcon sx={{ fontSize: 'var(--font-size-regular)' }} />
          </IconButton>
        )}
        <ModalIsDelete
          isOpen={isDelete.isOpen}
          handleCloseModal={isDelete.handleCloseModal}
        />
      </div>
      <div className={styles.star__date__container}>
        <div className={styles.stars}>
          {[...Array(5)].map((_, index) => (
            <StarRateIcon
              key={index}
              fontSize='small'
              sx={{
                margin: '0 -1.4px',
                color:
                  index < 4 ? 'var(--color-orange)' : 'var(--color-blue-light)',
              }}
            />
          ))}
        </div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
      {images && (
        <div className={styles.review__img__container}>
          {images.map((image) => (
            <img src={image} alt='이미지' />
          ))}
        </div>
      )}
      <div className={styles.review__description}>
        이 장난감은 정말 대단한 발견이에요! 잘 만들어졌고, 다채롭고, 아이들에게
        안전합니다. 우리 아이는 그것을 정말 좋아하고 몇 시간 동안 계속
        참여합니다. <br />
        소재는 내구성이 뛰어나고 디자인은 세심해서 걱정할 작은 부품이 없습니다.
        창의성을 장려하고 청소가 쉽습니다. 활동적인 플레이에 적극 추천합니다!
      </div>
    </div>
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
        <Box sx={{ paddingTop: '50px', display: 'flex', flexWrap: 'wrap' }}>
          {children}
        </Box>
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
