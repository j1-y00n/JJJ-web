// 신승주

import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/Payment.module.css';
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  SelectChangeEvent,
  Typography,
  Modal,
} from '@mui/material';
import { Logo } from '../components/Header';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { regexPayment } from '../constants/regex';
import { getUserById } from '../services/userServices';
import { Cart, Product, User } from '../types/type';
import { createPayment, getPayments } from '../services/paymentServices';
import { getNextId } from '../services/commonServices';
import {
  getUsedProductById,
  updateUsedProduct,
} from '../services/usedProductServices';
import { UserStore } from '../stores/User.store';
import { getProductById } from '../services/productServices';
import { deleteCart } from '../services/cartServices';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = useLocation();
  const { user } = UserStore();

  // Cart.tsx로 부터 받아올 때
  const [products, setProducts] = useState<Product[]>([]);
  let { carts } = location.state;
  useEffect(() => {
    const fetchProducts = async () => {
      if (carts) {
        try {
          const productPromises = carts.map((cart: Cart) =>
            getProductById(cart.productId)
          );
          const ProductsFromCarts = await Promise.all(productPromises);
          setProducts(ProductsFromCarts);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        }
      }
    };

    fetchProducts();
  }, [carts]);

  // productDetail.tsx로 부터 받아올 때
  let { product, count, totalPrice } = location.state;

  // usedProductList.tsx로 부터 받아올 때
  let {
    usedProductId,
    usedProductTitle,
    usedProductPrice,
    usedProductThumbnail,
    usedProductQuantity,
    usedProductTotalPrice,
  } = location.state;

  // 카트에서 온 경우 결제 금액
  const cartsTotalPrice = carts
    ?.map((cart: Cart) => cart.cartTotalPrice)
    .reduce((acc: number, price: number) => acc + price, 0);
  // 총 결제 금액
  let totalPaymentAmount =
    cartsTotalPrice || totalPrice || usedProductTotalPrice;

  const [deliveryMemo, setDeliveryMemo] = useState('0');
  const [customMemo, setCustomMemo] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedBank, setSelectedBank] = useState('kbstar');
  const [cardNumber, setCardNumber] = useState(['', '', '', '']);

  const handleDeliveryMemoChange = (event: SelectChangeEvent<string>) => {
    setDeliveryMemo(event.target.value);
  };

  const handleCardNumberChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedCardNumber = [...cardNumber];
      updatedCardNumber[index] = event.target.value.slice(0, 4);
      setCardNumber(updatedCardNumber);
    };

  // 정규식

  const validatePayment = (cardNumber: string[]): boolean => {
    const combinedCardNumber = cardNumber.join('');
    return regexPayment.test(combinedCardNumber);
  };

  // 검증 로직
  const errorMessages: Record<string, string> = {
    payment: '결제 수단을 선택해주세요',
  };

  // 결제하기 버튼 클릭
  const [isGoingToPay, setIsGoingToPay] = useState<boolean>(false);
  const handleClosePayModal = () => {
    setIsGoingToPay(false);
  };
  const [isPay, setIsPay] = useState<boolean>(false);
  const [errors, setErrors] = useState('');
  const handlePayProcess = () => setIsPay(true);
  const handlePayDone = () => {
    setIsPay(false);
    handleWhereToGo();
  };

  const handleWhereToGo = () => {
    if (product || carts) {
      navigate('/myPage');
    } else if (usedProductId) {
      navigate('/usedProductList');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return navigate('/', { state: pathname });
    }
    let tempErrors = '';
    let isValid = true;

    // 장바구니에서 구매 - 코드 작성해야 함
    if (carts) {
      try {
        const payments = await getPayments();
        let nextId = Number(getNextId(payments));
        const paymentPromises = carts.map((cart: Cart) => {
          const newPayment = {
            id: String(nextId++),
            paymentTimestamp: new Date().toISOString().slice(0, -5) + 'Z',
            paymentTotalPrice: Number(cart.cartTotalPrice),
            userId: Number(cart.userId),
            productId: Number(cart.productId),
            paymentQuantity: Number(cart.cartQuantity),
          };
          return createPayment(newPayment).then(() => {
            return deleteCart(cart.id);
          });
        });

        await Promise.all(paymentPromises);
        handleClosePayModal();
        handlePayProcess();
      } catch (error) {
        console.error('장바구니에서 결제하기 실패', error);
      }
    }

    // 디테일 페이지 경로를 통해 구매
    if (product) {
      try {
        const payments = await getPayments();
        const newPayment = {
          id: getNextId(payments),
          paymentTimestamp: new Date().toISOString().slice(0, -5) + 'Z',
          paymentTotalPrice: Number(totalPrice),
          userId: Number(user.id),
          productId: Number(product.id),
          paymentQuantity: Number(count),
        };
        await createPayment(newPayment);
        handleClosePayModal();
        handlePayProcess();
      } catch (error) {
        console.error('디테일 페이지에서 결제하기 실패', error);
      }
    }

    // 중고 상품에서 구매
    // 주문 내역에 포함은 안됨
    // 판매 유저의 상품이 판매중 -> 판매 완료로 수정됨
    if (usedProductId) {
      try {
        const makeUsedProductAsSold = {
          usedProductIsSold: true,
        };
        await updateUsedProduct(usedProductId, makeUsedProductAsSold);
        handleClosePayModal();
        handlePayProcess();
      } catch (error) {
        console.error('중고상품에서 결제하기 실패', error);
      }
    }
  };

  return (
    <div className='flex__container'>
      <Logo />
      <form className={styles.form__payment}>
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>구매자 정보</h1>
          <div className={styles.info__container}>
            <label className={styles.label}>이름</label>
            <input
              className={styles.input}
              type='text'
              value={user?.userName}
              disabled={true}
            />
          </div>
          <div className={styles.info__container}>
            <label className={styles.label}>핸드폰 번호</label>
            <input
              className={styles.input}
              type='text'
              value={user?.userPhone}
              disabled={true}
            />{' '}
          </div>

          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='address'>
              주소
            </label>
            <div className={styles.address__container}>
              <input
                className={styles.input}
                type='text'
                value={user?.userAddress}
                disabled={true}
              />
              <input
                className={styles.input}
                type='text'
                value={user?.userAddressDetail}
                disabled={true}
              />
            </div>
          </div>

          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='address-memo'>
              배송지 메모
            </label>
            <Select
              className={styles.select}
              variant='outlined'
              value={deliveryMemo}
              onChange={handleDeliveryMemoChange}
            >
              <MenuItem value='0'>선택</MenuItem>
              <MenuItem value='1'>문 앞</MenuItem>
              <MenuItem value='2'>직접 받고 부재 시 문 앞</MenuItem>
              <MenuItem value='3'>경비실</MenuItem>
              <MenuItem value='4'>택배함</MenuItem>
              <MenuItem value='5'>직접 입력</MenuItem>
            </Select>
          </div>
          {deliveryMemo === '5' && (
            <div
              className={`${styles.info__container} ${styles.enter__directly}`}
            >
              <label className={styles.label} htmlFor='address__memo'>
                배송 요청사항
              </label>
              <textarea
                id='address__memo'
                className={styles.textarea}
                name='detailContent'
                value={customMemo}
                onChange={(e) => setCustomMemo(e.target.value)}
                rows={5}
                maxLength={120}
                required
              ></textarea>
              <div className={styles.text__length}>{customMemo.length}/120</div>
            </div>
          )}
        </section>

        {/* 배송 상품 */}
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>배송 상품</h1>
          <div className={styles.info__container}>
            <div className={styles.delivery__products}>
              <div className={styles.total__price}>
                총 결제금액 : {totalPaymentAmount}원
              </div>
              {/* 장바구니에서 구매한 경우 */}
              {carts &&
                products.map((product, index) => {
                  const cart = carts[index];
                  return (
                    <DeliveryProduct
                      key={cart.id}
                      productTitle={product.productTitle}
                      productPrice={product.productPrice}
                      productThumbnail={product.productThumbnail}
                      numberOfPurchases={cart.cartQuantity}
                      totalPrice={cart.cartTotalPrice}
                    />
                  );
                })}
              {/* 제품 상세 페이지에서 구매한 경우 */}
              {product && (
                <DeliveryProduct
                  key={product.productId}
                  {...product}
                  numberOfPurchases={count}
                  totalPrice={totalPrice}
                />
              )}
              {/* 중고 상품 페이지에서 구매한 경우 */}
              {usedProductTitle && (
                <DeliveryProduct
                  key={usedProductId}
                  productTitle={usedProductTitle}
                  productPrice={usedProductPrice}
                  productThumbnail={usedProductThumbnail}
                  numberOfPurchases={usedProductQuantity}
                  totalPrice={usedProductTotalPrice}
                />
              )}
            </div>
          </div>
        </section>

        {/* 결제 수단 */}
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>결제 수단</h1>
          <div className={styles.info__container}>
            <FormControl
              component='fieldset'
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  value='card'
                  control={<Radio />}
                  label='카드 간편 결제'
                />
                <FormControlLabel
                  className={styles.label}
                  value='account'
                  control={<Radio />}
                  disabled={true}
                  label='계좌 간편 결제'
                />
                <FormControlLabel
                  className={styles.label}
                  value='general'
                  control={<Radio />}
                  disabled={true}
                  label='일반 결제'
                />
              </RadioGroup>

              {paymentMethod === 'card' && (
                <div className={styles.card__payment__container}>
                  <Select
                    className={styles.select}
                    value={selectedBank}
                    onChange={(e: SelectChangeEvent<string>) =>
                      setSelectedBank(e.target.value)
                    }
                    variant='outlined'
                  >
                    <MenuItem value='kbstar'>국민</MenuItem>
                    <MenuItem value='shinhan'>신한</MenuItem>
                    <MenuItem value='woori'>우리</MenuItem>
                    <MenuItem value='ibk'>기업</MenuItem>
                  </Select>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginTop: '5px',
                    }}
                  >
                    {cardNumber.map((value, index) => (
                      <input
                        className={styles.input__card__number}
                        key={index}
                        maxLength={4}
                        value={value}
                        onChange={handleCardNumberChange(index)}
                      />
                    ))}
                  </Box>
                </div>
              )}
              {(paymentMethod === 'account' || paymentMethod === 'general') && (
                <div className={styles.card__payment__container}>
                  <div className={styles.not__ready}>
                    기능 구현 준비중 입니다.
                  </div>
                </div>
              )}
            </FormControl>
          </div>
        </section>
      </form>

      <footer
        style={{ marginBottom: '50px', marginTop: '50px', width: '100%' }}
      >
        <Footer />
      </footer>

      {/* FIXED */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <div className={styles.fixed__price}>주문 확인, 정보 제공 동의</div>
          <Button
            className={styles.fixed__order}
            onClick={() => setIsGoingToPay(true)}
          >
            {totalPaymentAmount}원 결제하기
          </Button>
        </div>
      </div>

      {/* 결제 완료 전 모달 */}
      {/* 리팩토링 대상 */}
      <Modal
        open={isGoingToPay}
        onClose={handleClosePayModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modal__inner}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            정말로 결제하시겠습니까?
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ my: 2, color: 'var(--color-red)' }}
          >
            결제 후 환불이 불가능합니다.
          </Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button onClick={handleSubmit} sx={{ marginRight: '20px' }}>
              결제
            </Button>
            <Button onClick={handleClosePayModal}>취소</Button>
          </Box>
        </Box>
      </Modal>
      {/* 결제 완료 후 모달 */}
      <Modal
        open={isPay}
        onClose={handlePayDone}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={styles.modal__inner}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            결제가 완료 되었습니다
          </Typography>
          <Typography id='modal-modal-description' sx={{ my: 2 }}>
            총 금액 {totalPaymentAmount}원
          </Typography>
          <Typography id='modal-modal-description' sx={{ mb: 2 }}>
            배송지 메모 :
            {(() => {
              switch (deliveryMemo) {
                case '0':
                  return ' 없음';
                case '1':
                  return ' 문 앞';
                case '2':
                  return ' 직접 받고 부재 시 문 앞';
                case '3':
                  return ' 경비실';
                case '4':
                  return ' 택배함';
                case '5':
                  return ' ' + customMemo;
                default:
                  return '';
              }
            })()}
          </Typography>
          <Button onClick={handleWhereToGo} sx={{ width: '90%' }}>
            주문내역으로 이동
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

interface DeliveryProductProps {
  productTitle: string;
  productPrice: number;
  productThumbnail: string;
  numberOfPurchases: number;
  totalPrice: number;
}

const DeliveryProduct = ({
  productTitle,
  productPrice,
  productThumbnail,
  numberOfPurchases,
  totalPrice,
}: DeliveryProductProps) => {
  return (
    <div className={styles.product__container}>
      <div className={styles.product__img}>
        <img src={productThumbnail} alt={productTitle} />
      </div>
      <div className={styles.product__details}>
        <p>{productTitle}</p>
        <p>{productPrice}원</p>
        <p>수량 : {numberOfPurchases}개</p>
        <p>총 상품금액 : {totalPrice}원</p>
      </div>
      <div className={styles.product__delivery__price}>
        <p>배송비</p>
        <p>무료</p>
      </div>
    </div>
  );
};

// 여유 되면 구현 해보고 싶은 내용
// 제품 구매 페이지에서 수량 조절해서 가격이 조정되게
// 그리고 수량은 db.json의 데이터 이상으로는 올라갈 수 없게
// 구매 완료 후 db.json의 수량이 조절되도록
