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


// Select component
export const CustomSelect = () => {
  return (
    <div className={styles.cart__select}>
      <div className={styles.select__total}>
        <Checkbox {...label} color='primary' />
        <div className={styles.select__total__title}>전체선택</div>
      </div>
      <div className={styles.select__delete}>
        <div className={styles.select__delete__title}>X 선택삭제</div>
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
      <CustomButton content='X' className={styles.btn__delete} />
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

// Button component
interface CustomButtonProps {
  content: string;
  className?: string;
  onclick?: () => void;
};

const CustomButton = ({ content, className, onclick }: CustomButtonProps) => {
  return (
    <button 
      className={`${styles.btn} ${className}`}
    >
      {content}
    </button>
  );
};

// checkbox label
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


export default function Cart() {
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, '');

    if (numericValue === '' || Number(numericValue) < 1) {
      setCounter(1);
    } else {
      setCounter(Number(numericValue));
    }
  };

  return (
    <>
      <div className={styles.cart}>
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
                  {/* <CustomButton content='-' />
                  <input type="number" style={{width: '50px', marginRight: '10px', marginLeft: '10px'}} />
                  <CustomButton content='+' /> */}

                  <IconButton onClick={decreaseCounter}>
                    <RemoveIcon sx={{ fontSize: '10px' }} />
                  </IconButton>
                  <TextField
                    id='outlined'
                    type='text'
                    focused
                    value={count}
                    onChange={handleChange}
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
                  <IconButton onClick={increaseCounter}>
                    <AddIcon sx={{ fontSize: '10px' }} />
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
      </div>

      {/* FIXED */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <div className={styles.fixed__price}>총 0건 주문금액 00000원</div>
          <Button className={styles.fixed__order}>주문하기</Button>
        </div>
      </div>

      <div style={{marginBottom: '50px'}}>
        <Footer />
      </div>
    </>
  );
};
