// 변지윤 
// 중고 제품 등록
import React from 'react'
import styles from '../styles/pages/CreateUsedProduct.module.css';
import { InputAdornment, TextField } from '@mui/material';
import { theme } from '../styles/theme';


export default function CreateUsedProduct() {
  
  return (
    <>
      <div className={styles.createUsedProduct__container}>
        <div className={styles.createUsedProduct__title}>중고 상품 등록</div>
        <div className={styles.createUsedProduct__inner}>

          {/* 상품정보 */}
          <div className={styles.create__desc__container}>
            <div className={styles.desc__title}>상품정보</div>
            <div className={styles.desc__inner}>
              <div className={styles.image__container}>
                <div>상품 이미지</div>
                <button>이미지 등록</button>
              </div>
              <div className={styles.name__container}>
                <div>상품명</div>
                <input type='text'></input>
              </div>
              <div className={styles.condition__container}>
                <div>상품 상태</div>
                <div>
                  새상품
                </div>
              </div>
              <div>
                <div>설명</div>
                <input type="text" name="" id="" />
              </div>
            </div>
          </div>

          {/* 가격 */}
          <div className={styles.create__price__container}>
            <div>가격</div>
            <div>
              <div>가격</div>
              <div>
                {/* <TextField
                    id="outlined-number"
                    type="number"
                    defaultValue="0"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */}

                <TextField
                  id="outlined-end-adornment"
                  sx={{width: '25ch', color: 'black'}}
                  InputProps={{
                    endAdornment: <InputAdornment position="end" sx={{color: 'text.primary', fontSize: '20px'}}>원</InputAdornment>,
                  }}
                />
                
              </div>
            </div>
          </div>
          
          {/* 추가정보 */}
          <div className={styles.create__add__container}>
            <div>추가정보</div>
            <div>
              <div>
                <div>수량</div>
                <div>
                {/* <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { width: '300px' },
                  }}
                  noValidate
                  autoComplete="off"
                > */}
                  <TextField
                    id="outlined-number"
                    type="number"
                    defaultValue="1"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                {/* </Box> */}
                </div>
              </div>
              <div>
                <div>직거래</div>
                <input type='radio'></input>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fixed */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__create}>등록하기</div>
      </div>
    </>
  )
}
