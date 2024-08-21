import { Button, IconButton } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/pages/UsedProductList.module.css';
import {
  generateUsedProducts,
  UsedProductProp,
} from '../types/TempMockUsedProduct';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import useActiveState from '../hooks/useActiveState';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { CartModal } from './ProductDetail';

export default function UsedProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<UsedProductProp[]>([]);

  useEffect(() => {
    const generatedProducts = generateUsedProducts();
    setProducts(generatedProducts);
  }, []);

  return (
    <div className='flex__container'>
      <Header />
      <Button
        onClick={() => navigate('/createUsedProduct')}
        sx={{ marginLeft: '1060px'}}
      >
        중고 상품 등록 +
      </Button>
      <div className={styles.products__container}>
        {products.map((product, index) => (
          <UsedProduct
            key={index}
            {...product}
            onClick={() => console.log(`${product.usedTitle} clicked!`)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

interface UsedProductProps extends UsedProductProp {
  onClick: () => void;
}

function UsedProduct({
  usedImgSrc,
  usedThumbImg,
  usedTitle,
  usedStatus,
  usedDescription,
  usedPrice,
  usedCount,
  usedMethod,
  onClick,
}: UsedProductProps) {
  const { activeState, handleStateChange, handleToggle } = useActiveState(false);

 // 장바구니 모달
  const [isModalOpen, setModalOpen] = useState(false);

  const handleAddToCart = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.item__container} onClick={onClick}>
      <img
        src={usedThumbImg}
        alt={usedTitle}
        className={styles.item__thumb__img}
      />
      <div className={styles.item__descriptions}>
        <div className={styles.item__title}>{usedTitle}</div>
        <div className={styles.item__infos}>
          <div className={styles.item__price}>
            {usedPrice.toLocaleString()}원
          </div>
          <div className={styles.item__status}>{usedStatus}</div>
          <div className={styles.item__count}>수량: {usedCount}</div>
          <div className={styles.item__method}>직거래: {usedMethod}</div>
          <div className={styles.item__description}>
            설명: {usedDescription}
          </div>
          <div className={styles.btn__box}>
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
              <ShoppingCartOutlinedIcon className='default font__medium' />
              <ShoppingCartIcon className='show font__medium' />
            </IconButton>
            <IconButton
              className='round nest__icons'
              onClick={handleToggle}
            >
              <FavoriteBorderIcon className='default font__medium' />
              <FavoriteIcon
                className={`show font__medium ${
                  activeState ? 'active' : ''
                }`}
              />
            </IconButton>
            <Button color='secondary' sx={{padding: '5px'}}>구매하기</Button>
          </div>
        </div>
      </div>
      {/* <div className={styles.item__imgs}>
        {usedImgSrc.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${usedTitle} ${index + 1}`}
            className={styles.item__additionalImg}
          />
        ))}
      </div> */}
    </div>
  );
}
