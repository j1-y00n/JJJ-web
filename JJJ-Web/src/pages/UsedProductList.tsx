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
import ImageTab from '../components/ImageTab';
import { ModalCart } from '../components/ModalCart';
import { useOpenModal } from '../hooks/useOpenModal';
import ClearIcon from '@mui/icons-material/Clear';
import ModalIsDelete from '../components/ModalIsDelete';
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
        sx={{ marginLeft: '1060px' }}
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
  const { activeState, handleStateChange, handleToggle } =
    useActiveState(false);
  const navigate = useNavigate();
  // 장바구니 모달
  const { isOpen, handleOpenModal, handleCloseModal } = useOpenModal();
  const customPosition = { left: 18, top: -9 };

  // 삭제 모달
  const isDelete = useOpenModal();

  // 이미지탭 커스텀 CSS
  const customImageTabStyles = {
    detailLeft: styles.usedProductDetailLeft,
    detailThumbImg: styles.usedProductThumbImg,
    detailImgs: styles.usedProductImgs,
    img: styles.usedProductImg,
  };

  const [currentImg, setCurrentImg] = useState(usedThumbImg);
  const handleImgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.target as HTMLImageElement;
    if (!value.src) {
      return;
    }
    setCurrentImg(value.src);
  };

  const userId = 'userId1234';

  return (
    <div className={styles.item__container} onClick={onClick}>
      <ImageTab
        images={[usedThumbImg, ...usedImgSrc]}
        currentImg={currentImg}
        handleImgClick={handleImgClick}
        customStyles={customImageTabStyles}
      />
      <div className={styles.item__descriptions}>
        <div className={styles.item__infos}>
          <div className={styles.info__container}>
            <div className={styles.item__user}>
              <div>{userId}</div>
              {userId && (
                <IconButton
                  onClick={isDelete.handleOpenModal}
                  sx={{ padding: '2px' }}
                >
                  <ClearIcon sx={{ fontSize: 'var(--font-size-regular)' }} />
                </IconButton>
              )}
              <ModalIsDelete
                isOpen={isDelete.isOpen}
                handleCloseModal={isDelete.handleCloseModal}
              />
            </div>
            <div className={styles.item__title}>{usedTitle}</div>
            <div className={styles.item__price}>
              {usedPrice.toLocaleString()}원
            </div>
            <div className={styles.item__status}>{usedStatus}</div>
            <div className={styles.item__count}>수량: {usedCount}</div>
            <div className={styles.item__method}>직거래: {usedMethod}</div>
            <div className={styles.item__description}>
              설명: {usedDescription}
            </div>
          </div>
          <div className={styles.btn__box}>
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
              <ShoppingCartOutlinedIcon className='default font__medium' />
              <ShoppingCartIcon className='show font__medium' />
            </IconButton>
            <IconButton className='round nest__icons' onClick={handleToggle}>
              <FavoriteBorderIcon className='default font__medium' />
              <FavoriteIcon
                className={`show font__medium ${activeState ? 'active' : ''}`}
              />
            </IconButton>
            <Button
              color='secondary'
              onClick={() => navigate('/payment')}
              sx={{ padding: '5px', marginLeft: '20px' }}
            >
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
