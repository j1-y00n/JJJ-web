// 변지윤
// 장바구니
import React, { ReactNode } from 'react'
import styles from '../styles/pages/Cart.module.css';
import Footer from '../components/Footer';
import exampleImg from '../assets/images/cars.jpg';
import { Checkbox, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCounter } from '../hooks/useCounter';
import ClearIcon from '@mui/icons-material/Clear';
import Header from '../components/Header';


// Select component
export const CustomSelect = () => {
  return (
    <div className={styles.cart__select}>
      <div className={styles.select__total}>
        <Checkbox {...label} color='primary' />
        <div className={styles.select__total__title}>전체선택</div>
      </div>
      <div className={styles.select__delete}>
        <Button color='info'>
          <ClearIcon sx={{ fontSize: '14px' }} /> 선택삭제
        </Button>
      </div>
    </div>
  );
};

// Product component
interface CustomProductProps {
  descClassName?: string;
  imgClassName?: string;
  titleClassName?: string;
  contextClassName?: string;
}

export const CustomProduct = ({ descClassName, imgClassName, titleClassName, contextClassName }: CustomProductProps) => {
  return (
    <div className={`${styles.list__desc} ${descClassName ? descClassName : ''}`}>
      <IconButton className={styles.btn__delete}>
        <ClearIcon sx={{ fontSize: '16px' }} />
      </IconButton>
      <div className={styles.desc__container}>
        <Checkbox {...label} color='primary' />
        <img src={exampleImg} alt="상품이미지" className={`${styles.desc__image} ${imgClassName ? imgClassName : ''}`} />
        <div>
          <div className={`${styles.title__font} ${titleClassName ? titleClassName : ''}`}>0000장난감</div>
          <div className={`${styles.context__font} ${contextClassName ? contextClassName : ''}`}>0000 원</div>
        </div>
      </div>
    </div>
  );
};

// checkbox label
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Cart() {
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
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

  return (
    <div className='flex__container'>
      <Header />
      <div className={styles.cart__container}>
        <div className={styles.cart__title}>장바구니</div>

        {/* 선택박스 */}
        <CustomSelect />

        {/* 상품리스트 */}
        <div className={styles.cart__list__container}>
          <div className={styles.list__container__inner}>

            <CustomProduct />

            <div className={styles.list__quantity}>
              <div className={styles.title__font}>상품 주문 수량</div>
              <div>
                <IconButton className={styles.btn__quantity} onClick={decreaseCounter}>
                  <RemoveIcon sx={{ fontSize: '18px' }} />
                </IconButton>
                <TextField
                  id='outlined'
                  type='text'
                  value={count}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  InputProps={{
                    sx: {
                      padding: '0 !important', // Apply !important to padding
                      width: '50px',
                      height: '28px',
                      margin: '0 5px',
                      '& .MuiInputBase-input': {
                        textAlign: 'center',
                      },
                    },
                  }}
                />
                <IconButton className={styles.btn__quantity} onClick={increaseCounter}>
                  <AddIcon sx={{ fontSize: '18px' }} />
                </IconButton>

              </div>
            </div>

            <div className={styles.list__price}>
              <div className={styles.title__font}>상품금액</div>
              <div className={styles.context__font}>0000 원</div>
            </div>

            <div className={styles.list__delivery}>
              <div className={styles.title__font}>배송비</div>
              <div className={styles.context__font}>무료</div>
            </div>

          </div>
        </div>
        
      </div>

      <div style={{marginBottom: '50px', width: '100%'}}>
        <Footer />
      </div>

      {/* FIXED */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <div className={styles.fixed__price}>총 0건 주문금액 000000원</div>
          <Button className={styles.fixed__order}>주문하기</Button>
        </div>
      </div>
    </div>
  );
};
