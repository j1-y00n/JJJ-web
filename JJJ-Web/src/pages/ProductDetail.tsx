// 신승주
import React, { useEffect, useState } from 'react';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProductStore } from '../stores/Product.store';
import { useCounter } from '../hooks/useCounter';
import useActiveState from '../hooks/useActiveState';
import ImageTab from '../components/ImageTab';
import { useOpenModal } from '../hooks/useOpenModal';
import { ModalCart } from '../components/ModalCart';
import ModalIsDelete from '../components/ModalIsDelete';
import {
  ProductImage,
  ProductWithReviews,
  Review,
  ReviewImage,
  User,
} from '../types/type';
import { DeleteReview, getReviewImages } from '../services/reviewServices';
import { getProductImagesQuery } from '../services/productServices';
// 상품 설명 디테일 사진
import desc01 from '../assets/images/productDescription/desc01.jpeg';
import desc02 from '../assets/images/productDescription/desc02.jpeg';
import desc03 from '../assets/images/productDescription/desc03.jpeg';
import desc04 from '../assets/images/productDescription/desc04.jpeg';
import { ReviewStore } from '../stores/Review.store';
import {
  createCartProduct,
  getCarts,
  updateCartProduct,
} from '../services/cartServices';
import { getNextId } from '../services/commonServices';
import {
  createWishList,
  deleteWishList,
  getWishLists,
  getWishListsQuery,
} from '../services/wishListServices';
import { UserStore } from '../stores/User.store';
import { getUserById } from '../services/userServices';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { productId } = useParams();
  const { products } = ProductStore();
  const { user } = UserStore();
  const [product, setProduct] = useState<ProductWithReviews>();
  const [productImages, setProductImages] = useState<ProductImage[]>();
  const [wishListId, setWishListId] = useState<number | undefined>(undefined);
  const [currentImg, setCurrentImg] = useState('');
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
  const { activeState, handleStateChange, handleToggle } =
    useActiveState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = products.find(
          (product) => String(product.id) === String(productId)
        );
        if (product) {
          setProduct(product);
        }

        const productImages = await getProductImagesQuery(
          `productId=${productId}`
        );
        setProductImages(productImages);
        const isProductInWishlist = await getWishListsQuery(
          `userId=${user?.id}&productId=${productId}`
        );
        if (isProductInWishlist.length > 0) {
          handleStateChange(true);
          const wishListId = isProductInWishlist[0].id;
          setWishListId(wishListId);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [products]);

  // ImageTab에 들어가는 이미지 코드
  useEffect(() => {
    if (product) {
      setCurrentImg(product.productThumbnail);
    }
  }, [product]);
  const detailImages = productImages?.map((image) => image.imageUrl) || [];
  const images = [product?.productThumbnail, ...detailImages];

  const handleImgClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.target as HTMLImageElement;
    if (!value.src) {
      return;
    }
    setCurrentImg(value.src);
    console.log(value.src);
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

  const totalPrice = product && product.productPrice * count;

  // 장바구니에 제품 추가
  const handleAddToCart = async (productId: number) => {
    if (!product) {
      alert('제품이 없습니다');
      return;
    }
    if (!user) {
      return navigate('/signIn', { state: pathname });
    }
    try {
      const carts = await getCarts();
      const existingCart = carts.find((cart) => cart.productId === productId);
      if (existingCart) {
        const updateCart = {
          ...existingCart,
          cartQuantity: existingCart.cartQuantity + count,
          cartTotalPrice: existingCart.cartTotalPrice + (totalPrice || 0),
        };
        await updateCartProduct(updateCart);
      } else {
        const newCart = {
          id: getNextId(carts),
          productId,
          cartQuantity: count,
          cartTotalPrice: totalPrice || 0,
          userId: Number(user.id),
        };
        await createCartProduct(newCart);
      }
      alert('Added to cart');
    } catch (error) {
      console.error('Failed to add to cart', error);
    }
  };

  // 찜 목록에 추가 및 삭제가 토글로 작동함
  const handleUpdateWishLists = async (productId: number) => {
    if (!user) {
      return navigate('/signIn', { state: pathname });
    }
    try {
      if (wishListId) {
        await deleteWishList(wishListId);
        setWishListId(undefined);
      } else {
        const wishLists = await getWishLists();
        const newWishList = {
          id: getNextId(wishLists),
          productId,
          userId: Number(user.id),
        };
        await createWishList(newWishList);
        setWishListId(Number(newWishList.id));
      }
      handleToggle();
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) return <div>No product found</div>;
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
              <div>{product?.productTitle} </div>
              <div className={styles.product__price}>
                {product?.productPrice}원
              </div>
              <div className={styles.product__rating}>
                <StarRateIcon
                  sx={{
                    color: 'var(--color-orange)',
                    fontSize: 'var(--font-size-medium)',
                  }}
                />
                <h3>{product?.reviewRating}</h3>
                <p>({product?.reviewCount})</p>
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
                  customStyles={customPosition}
                />
                <IconButton
                  className='round nest__icons'
                  onClick={() => {
                    handleAddToCart(Number(product.id));
                    handleOpenModal();
                  }}
                  sx={{
                    marginRight: '20px',
                  }}
                >
                  <ShoppingCartOutlinedIcon className='default font__large' />
                  <ShoppingCartIcon className='show font__large' />
                </IconButton>
                <IconButton
                  className='round nest__icons'
                  onClick={() => handleUpdateWishLists(product.id)}
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
            <div>
              <div className={styles.detail__purchase}>
                <div className={styles.total__price__container}>
                  <span>총 결제 금액 :</span>
                  <span className={styles.product__total__price}>
                    {totalPrice}원
                  </span>
                </div>
                <Button
                  onClick={() =>
                    navigate('/payment', {
                      state: { product, count, totalPrice },
                    })
                  }
                  sx={{ fontSize: 'var(--font-size-regular)' }}
                >
                  구매하기
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DetailTab productId={productId} loginedUserId={Number(user?.id)} />
      </div>
      <Footer />
    </div>
  );
}

// 여기 아래 코드는 전부 DetailTab을 위한 코드
const detailDescriptions = [desc01, desc02, desc03, desc04];
const randomIndex = Math.floor(Math.random() * detailDescriptions.length);
const randomDescImg = detailDescriptions[randomIndex];

interface DetailTabProp {
  productId: string | undefined;
  loginedUserId: number | undefined;
}

function DetailTab({ productId, loginedUserId }: DetailTabProp) {
  const [value, setValue] = React.useState(0);
  const { reviews } = ReviewStore();
  const [productReviews, setProductReviews] = useState<Review[]>([]);

  useEffect(() => {
    const productReviews = reviews.filter(
      (review) => String(review.productId) === String(productId)
    );
    setProductReviews(productReviews);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // 리뷰 삭제
  const handleDeleteReview = async (id: number) => {
    try {
      await DeleteReview(id);
      setProductReviews(productReviews.filter((review) => review.id !== id));
      alert('SUCCESS review delete');
    } catch (error) {
      console.error(error);
      alert('FAIL review delete');
    }
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
          {productReviews && productReviews.length > 0 ? (
            productReviews.map((review) => (
              <ReviewComponent
                key={review.id}
                {...review}
                loginedUserId={loginedUserId}
                handleDeleteReview={() => handleDeleteReview(review.id)}
              />
            ))
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              등록된 리뷰가 없습니다.
            </Box>
          )}
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
interface ReviewComponentProps {
  id: number;
  reviewContent: string;
  reviewRating: number;
  userId: number;
  loginedUserId: number | undefined;
  handleDeleteReview: () => void;
}

function ReviewComponent({
  id,
  reviewContent,
  reviewRating,
  userId,
  loginedUserId,
  handleDeleteReview,
}: ReviewComponentProps) {
  // 로그인된 사용자의 리뷰에만 삭제 버튼이 보이도록 해야 함

  const [reviewImages, setReviewImages] = useState<ReviewImage[] | undefined>(
    undefined
  );
  const [reviewUser, setReviewUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewImages = await getReviewImages();
        const productImages = reviewImages.filter(
          (images) => images.reviewId === Number(id)
        );
        setReviewImages(productImages);
        const reviewUser = await getUserById(userId);
        setReviewUser(reviewUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const images = reviewImages?.map((image) => image.imageUrl);

  // 삭제 모달
  const isDelete = useOpenModal();

  return (
    <div className={styles.review}>
      <div className={styles.review__id}>
        <div>{reviewUser?.userLoginId}</div>
        {Number(reviewUser?.id) === loginedUserId && (
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
          handleDeleteContent={handleDeleteReview}
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
                  index < reviewRating
                    ? 'var(--color-orange)'
                    : 'var(--color-blue-light)',
              }}
            />
          ))}
        </div>
        <div>{new Date().toLocaleDateString()}</div>
      </div>
      {images && (
        <div className={styles.review__img__container}>
          {images.map((image, index) => (
            <img key={index} src={image} alt='이미지' />
          ))}
        </div>
      )}
      <div className={styles.review__description}>{reviewContent}</div>
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
