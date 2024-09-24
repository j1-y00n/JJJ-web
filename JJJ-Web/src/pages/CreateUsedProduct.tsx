// 변지윤
// 중고 제품 등록
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/CreateUsedProduct.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Footer from '../components/Footer';
import {
  Button,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Logo } from '../components/Header';
import UploadFile from '../components/UploadFile';
import { UsedProduct } from '../types/type';
import {
  createUsedProduct,
  getUsedProducts,
} from '../services/usedProductServices';
import { useNavigate } from 'react-router-dom';
import noImage from '../assets/images/noImage.png';
import { UserStore } from '../stores/User.store';

export default function CreateUsedProduct() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = UserStore();

  const [usedProducts, setUsedProducts] = useState<UsedProduct[]>();

  const [usedProduct, setUsedProduct] = useState<Omit<UsedProduct, 'id'>>({
    usedProductTitle: '',
    usedProductPrice: 0,
    usedProductCondition: '새상품(미사용)',
    usedProductDetail: '',
    usedProductThumbnail: noImage,
    usedProductQuantity: 1,
    usedProductTransaction: '가능',
    usedProductIsSold: false,
    userId: Number(user?.id),
  });

  useEffect(() => {
    const fetchUsedProducts = async () => {
      const fetchedUsedProducts = await getUsedProducts();
      setUsedProducts(fetchedUsedProducts);
    };
    fetchUsedProducts();
  }, []);

  const getNextId = () => {
    if (usedProducts && usedProducts.length > 0) {
      return String(Number(usedProducts[usedProducts.length - 1].id) + 1);
    }
    return '1';
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUsedProduct({ ...usedProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUsedProduct = { ...usedProduct, id: getNextId() };
    try {
      await createUsedProduct(newUsedProduct);
      alert('SUCCESS create usedproduct');
      navigate('/UsedProductList');
    } catch (error) {
      console.error(error);
      alert('FAIL create usedproduct');
    }
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  // 상품명
  const validateTitle = (input: string) => {
    let byteLength = 0;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      byteLength += char.charCodeAt(0) > 0x007f ? 2 : 1;

      if (byteLength > 40) {
        return false;
      }
    }
    return true;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (validateTitle(input)) {
      setUsedProduct({ ...usedProduct, usedProductTitle: input });
    } else {
      alert('상품명은 20자 이내로 입력해주세요');
    }
  };

  // 설명
  const validateDetail = (input: string) => {
    let byteLength = 0;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      byteLength += char.charCodeAt(0) > 0x007f ? 2 : 1;

      if (byteLength > 240) {
        return false;
      }
    }
    return true;
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    if (validateDetail(input)) {
      setUsedProduct({ ...usedProduct, usedProductDetail: input });
    }
  };

  const handleDetailKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 가격(number만 입력가능)
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거

    if (numericValue === '') {
      setUsedProduct({ ...usedProduct, usedProductPrice: 0 }); // 빈 문자열일 경우 0으로 설정
    } else {
      setUsedProduct({
        ...usedProduct,
        usedProductPrice: Number(numericValue),
      });
    }
  };

  // 수량(number만 입력 가능)
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거

    if (numericValue === '') {
      setUsedProduct({ ...usedProduct, usedProductQuantity: 1 }); // 빈 문자열일 경우 1으로 설정
    } else {
      setUsedProduct({
        ...usedProduct,
        usedProductQuantity: Number(numericValue),
      });
    }
  };

  // 포커스 잃을 때 유효성 검사
  const handleQuantityBlur = () => {
    if (usedProduct.usedProductQuantity < 1) {
      setUsedProduct({ ...usedProduct, usedProductQuantity: 1 }); // 숫자가 1보다 작으면 1로 고정
    }
  };

  return (
    <div className='flex__container'>
      <Logo />
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className={styles.createUsedProduct__inner}>
          {/* 상품정보 */}
          <div className={styles.create__desc__container}>
            <div className={styles.container__title}>중고상품정보</div>
            <div className={styles.desc__inner}>
              <div className={styles.image__container}>
                <div className={styles.inner__title}>상품 이미지</div>
                <UploadFile />
              </div>
              <div className={styles.name__container}>
                <div className={`${styles.inner__title} ${styles.inner__flex}`}>
                  상품명
                </div>
                <input
                  type='text'
                  className={styles.title__input}
                  name='usedProductTitle'
                  value={usedProduct.usedProductTitle}
                  onChange={handleTitleChange}
                  placeholder='최대 20자'
                  maxLength={20}
                  required
                />
                <div style={{ marginTop: '30px', marginLeft: '10px' }}>
                  {usedProduct.usedProductTitle.length}/20
                </div>
              </div>
              <div className={styles.condition__container}>
                <div className={styles.inner__title}>상품 상태</div>

                <FormControl>
                  <RadioGroup
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='usedProductCondition'
                    value={usedProduct.usedProductCondition}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='새상품(미사용)'
                      control={<Radio color='primary' />}
                      label='새상품(미사용)'
                    />
                    <FormControlLabel
                      value='사용감 없음'
                      control={<Radio color='primary' />}
                      label='사용감 없음'
                    />
                    <FormControlLabel
                      value='사용감 적음'
                      control={<Radio color='primary' />}
                      label='사용감 적음'
                    />
                    <FormControlLabel
                      value='사용감 많음'
                      control={<Radio color='primary' />}
                      label='사용감 많음'
                    />
                    <FormControlLabel
                      value='고장/파손 상품'
                      control={<Radio color='primary' />}
                      label='고장/파손 상품'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={styles.detail__container}>
                <div className={styles.inner__title}>설명</div>
                <textarea
                  name='usedProductDetail'
                  className={styles.detail__input}
                  value={usedProduct.usedProductDetail}
                  onChange={handleChange}
                  onKeyDown={handleDetailKeyDown}
                  rows={5}
                  maxLength={120}
                  required
                ></textarea>
                <div style={{ marginTop: '90px', marginLeft: '10px' }}>
                  {usedProduct.usedProductDetail.length}/120
                </div>
              </div>
            </div>
          </div>

          {/* 가격 */}
          <div className={styles.create__price__container}>
            <div className={styles.container__title}>가격</div>
            <div className={styles.num__container}>
              <div className={styles.inner__title}>가격</div>
              <div>
                <FormControl sx={{ width: '300px' }} variant='outlined'>
                  <OutlinedInput
                    id='outlined-adornment-weight'
                    endAdornment={
                      <InputAdornment position='end'>
                        <Typography sx={{ color: 'grey' }}>원</Typography>
                      </InputAdornment>
                    }
                    aria-describedby='outlined-weight-helper-text'
                    name='usedProductPrice'
                    value={usedProduct.usedProductPrice}
                    onChange={handlePriceChange}
                    sx={{ height: '48px' }}
                  />
                </FormControl>
              </div>
            </div>
          </div>

          {/* 추가정보 */}
          <div className={styles.create__add__container}>
            <div className={styles.container__title}>추가정보</div>
            <div>
              <div className={styles.num__container}>
                <div className={styles.inner__title}>수량</div>
                <div>
                  <FormControl sx={{ width: '300px' }} variant='outlined'>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      endAdornment={
                        <InputAdornment position='end'>
                          <Typography sx={{ color: 'grey' }}>개</Typography>
                        </InputAdornment>
                      }
                      aria-describedby='outlined-weight-helper-text'
                      sx={{ height: '48px' }}
                      name='usedProductQuantity'
                      value={usedProduct.usedProductQuantity}
                      onChange={handleQuantityChange}
                      onBlur={handleQuantityBlur}
                    />
                  </FormControl>
                </div>
              </div>
              <div className={styles.transaction__container}>
                <div className={styles.inner__title}>직거래</div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby='demo-controlled-radio-buttons-group'
                    name='usedProductTransaction'
                    value={usedProduct.usedProductTransaction}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value='가능'
                      control={<Radio color='primary' />}
                      label='가능'
                    />
                    <FormControlLabel
                      value='불가'
                      control={<Radio color='primary' />}
                      label='불가'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div style={{ marginBottom: '50px', marginTop: '50px', width: '100%' }}>
        <Footer />
      </div>

      {/* Fixed */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <Button
            type='button'
            className={styles.fixed__create}
            onClick={handleButtonClick}
          >
            등록하기
          </Button>
        </div>
      </div>
    </div>
  );
}
