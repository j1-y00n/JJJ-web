import { Button, IconButton } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/pages/UsedProductList.module.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { UsedProduct, User } from '../types/type';
import {
  deleteUsedProduct,
  getUsedProductImages,
  getUsedProducts,
} from '../services/usedProductServices';
import { getUserById } from '../services/userServices';
import noImage from '../assets/images/noImage.png';
import { UserStore } from '../stores/User.store';

export default function UsedProductList() {
  const navigate = useNavigate();
  const [usedProducts, setUsedProducts] = useState<UsedProduct[]>([]);
  const { user } = UserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usedProducts = await getUsedProducts();
        setUsedProducts([...usedProducts].reverse());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [usedProducts]);

  // 중고 상품 삭제
  const handleDeleteUsedProduct = async (id: number) => {
    try {
      await deleteUsedProduct(id);
      alert('SUCCESS usedProduct delete');
    } catch (error) {
      console.error(error);
      alert('FAIL usedProduct delete');
    }
  };

  return (
    <div className='flex__container'>
      <Header />
      <Button
        onClick={() => {
          if (!user) {
            return navigate('/signIn', { state: '/createUsedProduct' });
          }
          navigate('/createUsedProduct');
        }}
        sx={{ marginLeft: '1060px' }}
      >
        중고 상품 등록 +
      </Button>
      <div className={styles.products__container}>
        {usedProducts.length > 0 ? (
          usedProducts.map((usedProduct) => (
            <UsedProductComponent
              key={usedProduct.id}
              {...usedProduct}
              handleDeleteUsedProduct={() =>
                handleDeleteUsedProduct(usedProduct.id)
              }
              user={user}
            />
          ))
        ) : (
          <div className={styles.no__product}>
            <h3>이용 가능한 상품이 없습니다</h3>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

interface UsedProductComponentProps extends UsedProduct {
  handleDeleteUsedProduct: () => void;
  user: User | null;
}

function UsedProductComponent({
  id: usedProductId,
  usedProductTitle,
  usedProductPrice,
  usedProductCondition,
  usedProductDetail,
  usedProductThumbnail,
  usedProductQuantity,
  usedProductTransaction,
  usedProductIsSold,
  userId: sellerUserId,
  handleDeleteUsedProduct,
  user,
}: UsedProductComponentProps) {
  const [usedProductImages, setUsedProductImages] = useState<string[]>([]);
  const [sellerLoginId, setSellerLoginId] = useState<string>('');
  const { activeState, handleStateChange, handleToggle } =
    useActiveState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usedProductImagesArray = await getUsedProductImages();
        const currentUsedProductImages = usedProductImagesArray.filter(
          (item) => item.usedProductId === usedProductId
        );
        const imageUrls = currentUsedProductImages.map(
          (images) => images.imageUrl
        );
        setUsedProductImages(imageUrls);

        if (sellerUserId) {
          const sellerUser = await getUserById(sellerUserId);
          const sellerLoginId = sellerUser.userLoginId;

          setSellerLoginId(sellerLoginId);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 장바구니 모달
  const { isOpen, handleOpenModal, handleCloseModal } = useOpenModal();
  const customPosition = { left: 18, top: -9 };

  // 삭제 모달
  const isDelete = useOpenModal();

  // 이미지탭 커스텀 CSS
  const customImageTabStyles = {
    padding: '0',
    thumbImgHeight: '246px',
    imgsHeight: '60px',
  };

  const [currentImg, setCurrentImg] = useState(usedProductThumbnail || noImage);
  const handleImgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.target as HTMLImageElement;
    if (!value.src) {
      return;
    }
    setCurrentImg(value.src);
  };

  const handlePurchase = () => {
    if (!user) {
      return navigate('/signIn', {
        state: { pathname },
      });
    }
    if (String(user.id) === String(sellerUserId)) {
      alert('내가 올린 상품입니다.');
      return;
    }
    navigate('/payment', {
      state: {
        usedProductId,
        usedProductTitle,
        usedProductPrice,
        usedProductThumbnail,
        usedProductQuantity,
        usedProductTotalPrice: usedProductPrice * usedProductQuantity,
      },
    });
  };

  if (usedProductIsSold) return null;
  return (
    <div className={styles.item__container}>
      <ImageTab
        images={[usedProductThumbnail, ...usedProductImages]}
        currentImg={currentImg}
        handleImgClick={handleImgClick}
        customStyles={customImageTabStyles}
      />
      <div className={styles.item__descriptions}>
        <div className={styles.item__infos}>
          <div className={styles.info__container}>
            <div className={styles.item__user}>
              <div>{sellerLoginId}</div>
              {String(user?.id) === String(sellerUserId) && (
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
                handleDeleteContent={handleDeleteUsedProduct}
              />
            </div>
            <div className={styles.item__title}>{usedProductTitle}</div>
            <div className={styles.item__price}>
              {usedProductPrice.toLocaleString()}원
            </div>
            <div className={styles.item__status}>{usedProductCondition}</div>
            <div className={styles.item__count}>
              수량: {usedProductQuantity}
            </div>
            <div className={styles.item__method}>
              직거래: {usedProductTransaction}
            </div>
            <div className={styles.item__description}>
              설명: {usedProductDetail}
            </div>
          </div>
          <div className={styles.btn__box}>
            {/* 장바구니 모달 */}
            <ModalCart
              isOpen={isOpen}
              handleCloseModal={handleCloseModal}
              customStyles={customPosition}
            />
            <IconButton
              className='round nest__icons'
              disabled={true}
              onClick={handleOpenModal}
              sx={{
                marginRight: '20px',
              }}
            >
              <ShoppingCartOutlinedIcon className='default font__medium' />
              <ShoppingCartIcon className='show font__medium' />
            </IconButton>
            <IconButton
              className='round nest__icons'
              disabled={true}
              onClick={handleToggle}
            >
              <FavoriteBorderIcon className='default font__medium' />
              <FavoriteIcon
                className={`show font__medium ${activeState ? 'active' : ''}`}
              />
            </IconButton>
            <Button
              color='secondary'
              onClick={handlePurchase}
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
