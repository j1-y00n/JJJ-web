// 변지윤
// 중고 제품 등록
import React, { useState } from 'react';
import styles from '../styles/pages/CreateUsedProduct.module.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Footer from '../components/Footer';
import { useInput } from '../hooks/useInput';
import { InputAdornment, OutlinedInput, Typography } from '@mui/material';


export default function CreateUsedProduct() {
  // 상품상태 radio button
  const [condition, setCondition] = useState('새상품(미사용)');

  const handleConditionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCondition((event.target as HTMLInputElement).value);
  };

  // 직거래 radio button
  const [transaction, setTransaction] = useState('가능');

  const handleTransactionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransaction((event.target as HTMLInputElement).value);
  };

  // 상품명
  const { 
    value: title, 
    handleInputChange: titleInputChange,
  } = useInput('');

  // 설명
  const {
    value: detail,
    handleInputChange: detailInputChange,
  } = useInput('');

  // 가격(number만 입력가능)
  const [price, setPrice] = useState<number>(0);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거

    if (numericValue === '') {
      setPrice(0); // 빈 문자열일 경우 0으로 설정
    } else {
      setPrice(Number(numericValue));
    }
  };

  // 수량(number만 입력 가능)
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거

    if (numericValue === '') {
      setQuantity(0); // 빈 문자열일 경우 0으로 설정
    } else {
      setQuantity(Number(numericValue));
    }
  };

  // 포커스 잃을 때 유효성 검사
  const handleQuantityBlur = () => {
    if (quantity < 1) {
      setQuantity(1); // 숫자가 1보다 작으면 1로 고정
    }
  };


  return (
    <div className='flex__container'>
      <form>
        <div className={styles.createUsedProduct__header}>중고 상품 등록</div>
          <div className={styles.createUsedProduct__inner}>
            {/* 상품정보 */}
            <div className={styles.create__desc__container}>
              <div className={styles.container__title}>상품정보</div>
              <div className={styles.desc__inner}>
                <div className={styles.image__container}>
                  <div className={styles.inner__title}>상품 이미지</div>
                  <input type='file' />
                </div>
                <div className={styles.name__container}>
                  <div className={styles.inner__title}>상품명</div>
                  <input 
                    type='text' 
                    className={styles.title__input} 
                    value={title} 
                    onChange={titleInputChange} 
                    maxLength={20}
                  />
                </div>
                <div className={styles.condition__container}>
                  <div className={styles.inner__title}>상품 상태</div>

                  <FormControl>
                    <RadioGroup
                      aria-labelledby='demo-controlled-radio-buttons-group'
                      name='controlled-radio-buttons-group'
                      value={condition}
                      onChange={handleConditionChange}
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
                    name='detailContent'
                    className={styles.detail__input}
                    value={detail}
                    onChange={detailInputChange}
                    rows={3}
                    maxLength={100}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* 가격 */}
            <div className={styles.create__price__container}>
              <div className={styles.container__title}>가격</div>
              <div className={styles.num__container}>
                <div className={styles.inner__title}>가격</div>
                <div>
                  <FormControl sx={{ width: '300px' }} variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      endAdornment={<InputAdornment position="end">
                        <Typography sx={{ color: 'grey' }}>원</Typography>
                      </InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      value={price}
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
                  <FormControl sx={{ width: '300px' }} variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      endAdornment={<InputAdornment position="end">
                        <Typography sx={{ color: 'grey' }}>개</Typography>
                      </InputAdornment>}
                      aria-describedby="outlined-weight-helper-text"
                      sx={{ height: '48px' }}
                      value={quantity}
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
                      name='controlled-radio-buttons-group'
                      value={transaction}
                      onChange={handleTransactionChange}
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

      <div style={{marginBottom: '50px', marginTop: '100px', width: '100%'}}>
        <Footer />
      </div>

      {/* Fixed */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <button className={styles.fixed__create}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
