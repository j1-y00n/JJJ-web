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
} from '@mui/material';
import { Logo } from '../components/Header';
import Footer from '../components/Footer';
import { useInput } from '../hooks/useInput';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import MuiModal from '@mui/material/Modal';
import DaumPostcodeEmbed from 'react-daum-postcode';
import balloonImg from '../assets/images/balloon.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import { regexName, regexPayment, regexPhone } from '../constants/regex';
import { getUserById } from '../services/userServices';
import { Product, User } from '../types/type';
import axios from 'axios';
import { LOCALHOST_PORT } from '../constants/api';
import { productTitles } from '../types/TempMockdata';

export default function Payment() {
  const location = useLocation();
  let { product, count, totalPrice } = location.state;
  let {
    id,
    usedProductTitle,
    usedProductPrice,
    usedProductThumbnail,
    usedProductQuantity,
    usedProductTotalPrice,
  } = location.state;
  console.log(product, count, totalPrice);
  // const [buyProducts, setBuyProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   if (products && products.length > 0) {
  //     setBuyProducts(products);
  //   } else if (product) {
  //     setBuyProducts([product]);
  //   }
  // }, [product, products]);

  // userId 가져옴
  const userId = 1;
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${LOCALHOST_PORT}/users/${userId}`);
      const user = response.data;
      setUser(user);
    };
    fetchData();
  }, [userId]);

  // 구매자 이름
  const { value: name, handleInputChange: nameInputChange } = useInput('');

  // 배송 메모
  const { value: detail, handleInputChange: detailInputChange } = useInput('');

  //! 주소 입력 기능
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleSearchtoggle = () => {
    setIsOpen(!isOpen);
  };

  const modalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },

    content: {
      width: '500px',
      height: '600px',
      margin: 'auto',
      overflow: 'hidden',
      padding: '20px',
      position: 'absolute',
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      justifyContent: 'center',
    },
  };

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

  // 결제하기 버튼 클릭
  const [isPay, setIsPay] = useState<boolean>(false);
  const handlePayProcess = () => setIsPay(true);
  const handlePayDone = () => {
    setIsPay(false);
    navigate('/myPage');
  };
  const navigate = useNavigate();

  // 정규식

  const validatePayment = (cardNumber: string[]): boolean => {
    const combinedCardNumber = cardNumber.join('');
    return regexPayment.test(combinedCardNumber);
  };

  // 검증 로직
  const errorMessages: Record<string, string> = {
    payment: '결제 수단을 선택해주세요',
  };

  const [errors, setErrors] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let tempErrors = '';
    let isValid = true;
  };

  return (
    <div className='flex__container'>
      <Logo />
      <form className={styles.form__payment}>
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>구매자 정보</h1>
          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='name'>
              이름
            </label>
            <input
              id='name'
              className={styles.input}
              type='text'
              placeholder='이름'
              value={user?.userName}
              onChange={nameInputChange}
              maxLength={20}
              disabled={true}
            />{' '}
          </div>
          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='phone'>
              핸드폰 번호
            </label>
            <input
              id='phone'
              className={styles.input}
              type='text'
              placeholder='핸드폰 번호'
              value={user?.userPhone}
              onChange={nameInputChange}
              maxLength={20}
              disabled={true}
            />{' '}
          </div>

          <div className={styles.info__container}>
            <label className={styles.label} htmlFor='address'>
              주소
            </label>
            <div className={styles.address__container}>
              <input
                id='address'
                className={`${styles.input} ${styles.address}`}
                type='text'
                name='zipCode'
                placeholder='우편번호'
                // value={formData.address?.zipCode || ''}
                // onChange={handleInputChange}
                maxLength={20}
                readOnly
                disabled={true}
              />
              <input
                className={`${styles.input} ${styles.address}`}
                type='text'
                name='roadAddress'
                placeholder='도로명주소'
                value={user?.userAddress}
                // onChange={handleInputChange}
                maxLength={20}
                readOnly
                disabled={true}
              />
              <input
                className={`${styles.input} ${styles.address}`}
                type='text'
                name='detailAddress'
                placeholder='상세주소'
                value={user?.userAddressDetail}
                // onChange={handleInputChange}
                // onBlur={handleBlur}
                maxLength={20}
                required
                disabled={true}
              />
              <Button
                onClick={handleSearchtoggle}
                color='info'
                disabled={true}
                sx={{
                  position: 'absolute',
                  top: '0px',
                  right: '-80px',
                  cursor: 'pointer',
                  borderRadius: 'var(--border-radius)',
                  height: '48px',
                }}
              >
                주소찾기
              </Button>
              <Modal
                isOpen={isOpen}
                style={modalStyles}
                ariaHideApp={false}
                onRequestClose={() => setIsOpen(false)}
              >
                <div
                  id='closeBtn'
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginBottom: '10px',
                  }}
                >
                  <CloseIcon
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setIsOpen(false)}
                  />
                </div>
                <DaumPostcodeEmbed
                  // onComplete={finalInput}
                  style={{ height: '95%' }}
                />
              </Modal>
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
              <div className={styles.text__length}>{detail.length}/120</div>
            </div>
          )}
        </section>

        {/* 배송 상품 */}
        <section className={styles.section__container}>
          <h1 className={styles.info__title}>배송 상품</h1>
          <div className={styles.info__container}>
            <div className={styles.delivery__products}>
              <div className={styles.total__price}>
                총 결제금액 : {totalPrice && totalPrice}
                {usedProductTotalPrice && usedProductTotalPrice}원
              </div>
              {product && (
                <DeliveryProduct
                  key={product.productId}
                  {...product}
                  numberOfPurchases={count}
                  totalPrice={totalPrice}
                />
              )}
              {usedProductTitle && (
                <DeliveryProduct
                  key={id}
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
          <Button className={styles.fixed__order} onClick={handlePayProcess}>
            10000원 결제하기
          </Button>
        </div>
      </div>

      {/* 모달 */}
      <MuiModal
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
            총 금액 {totalPrice && totalPrice}
            {usedProductTotalPrice && usedProductTotalPrice}원
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
          <Button onClick={() => navigate('/Mypage')} sx={{ width: '90%' }}>
            주문내역으로 이동
          </Button>
        </Box>
      </MuiModal>
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
