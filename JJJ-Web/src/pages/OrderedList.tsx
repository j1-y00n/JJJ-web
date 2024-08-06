// 신승주
import styles from '../styles/pages/OrderedList.module.css';
import balloonImg from '../assets/images/balloon.jpg';
import {
  Box,
  Button,
  Modal,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Footer from '../components/Footer';
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useInputFile } from '../hooks/useInputfile';
import { useInput } from '../hooks/useInput';

export default function OrderedList() {
  return (
    <>
      <div className={styles.ordered__list}>
        <Box
          className={styles.search}
          component='form'
          sx={{
            width: '500px',
            maxWidth: '100%',
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            fullWidth
            id='fullWidth'
            label='상품명'
            variant='outlined'
          />
          <Button variant='contained' sx={{ marginLeft: '10px' }}>
            검색
          </Button>
        </Box>
        <Orders />
        <Orders />
        <Orders />
      </div>
    </>
  );
}

const Orders = () => {
  return (
    <div className={styles.order__wrapper}>
      <div className={styles.order__number}>주문번호 : 1111111</div>
      <div className={styles.order__number__wrapper}>
        <Order />
        <Order />
      </div>
    </div>
  );
};

const Order = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reviewOpen, setReviewOpen] = useState(false);
  const handleOpenReview = () => {
    handleClose();
    setReviewOpen(true);
  };
  const handleCloseReview = () => setReviewOpen(false);

  const { value, handleInputChange } = useInput('상세 내용');

  const [valueStars, setValueStars] = React.useState<number | null>(5);
  return (
    <div className={styles.order__detail__wrapper}>
      <div className={styles.detail__left}>
        <img src={balloonImg} alt='balloonImg' />
      </div>
      <div className={styles.detail__middle}>
        <p>상품명 : 풍선</p>
        <p>상품가격 : 2000원</p>
        <p>수량 : 5개</p>
      </div>
      <div className={styles.detail__right}>
        <Button
          onClick={() => navigate('/cart')}
          variant='contained'
          sx={{ marginBottom: '20px' }}
        >
          장바구니
        </Button>
        <React.Fragment>
          <Button onClick={handleOpen} variant='contained'>
            리뷰작성
          </Button>{' '}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box
              component='form'
              className={styles.modal__inner}
              sx={{
                '& .MuiTextField-root': { my: 2, width: '100%' },
              }}
              noValidate
              autoComplete='off'
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                <div className={styles.modal__wrapper}>
                  <img src={balloonImg} alt='balloonImg' />
                  <div className={styles.modal__product__details}>
                    <p>상품명 : 풍선</p>
                    <div className={styles.modal__rating}>
                      <p>평가 : </p>
                      <Stack spacing={1} ml={1}>
                        <Rating
                          name='half-rating'
                          precision={0.5}
                          value={valueStars}
                          onChange={(event, newValue) => {
                            setValueStars(newValue);
                          }}
                        />
                      </Stack>
                    </div>
                  </div>
                </div>
              </Typography>
              <UploadInput />
              <div className={styles.textField__box}>
                <TextField
                  id='outlined-multiline-static'
                  label='리뷰 작성'
                  multiline
                  rows={10}
                  value={value}
                  onChange={handleInputChange}
                  focused
                />
              </div>
              <button
                onClick={handleOpenReview}
                className={`${styles.review__submit} ${styles.label__button}`}
              >
                리뷰 등록
              </button>
            </Box>
          </Modal>{' '}
          <Modal
            open={reviewOpen}
            onClose={handleCloseReview}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'
          >
            <Box
              className={`${styles.modal__inner} ${styles.review__create__btn}`}
            >
              <p id='child-modal-title' className={styles.review__create__desc}>
                리뷰가 등록 되었습니다
              </p>
              <Button onClick={handleCloseReview}>리뷰 닫기</Button>
            </Box>
          </Modal>
        </React.Fragment>
      </div>
    </div>
  );
};

const UploadInput = () => {
  const { imageSrcs, fileNames, isLoaded, handleChangeFile } = useInputFile();

  return (
    <div className={styles.upload__input}>
      <div>
        <label role='button' htmlFor='file' className={styles.label__button}>
          이미지 등록 : 최대 5개
        </label>
        <input
          id='file'
          type='file'
          multiple
          onChange={handleChangeFile}
          className={styles.sr__only}
        />
      </div>
      {isLoaded && (
        <div className={styles.preview__container}>
          {imageSrcs.slice(0, 5).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`미리보기 ${index + 1}`}
              className={styles.output__image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// 여유가 되면 구현해보고 싶은 로직
// 이미지를 업로드하면 덮어씌우게 하기
// 이미지에 X 버튼 눌러서 삭제하는 기능
