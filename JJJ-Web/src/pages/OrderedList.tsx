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
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useInput } from '../hooks/useInput';
import UploadInput from '../components/UploadInput';

export default function OrderedList() {
  const { value, handleInputChange, reset } = useInput('');
  return (
    <div className={styles.ordered__list}>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '500px',
          marginBottom: '20px',
        }}
      >
        <TextField
          id='outlined-multiline-static'
          label='상품명'
          type='text'
          placeholder='상품명을 검색해주세요.'
          value={value}
          onChange={handleInputChange}
          sx={{
            fontSize: 'var(--font-size-regular)',
          }}
        />
        <Button sx={{ marginLeft: '10px' }}>검색</Button>
      </Box>
      <Orders />
      <Orders />
      <Orders />
    </div>
  );
}

const Orders = () => {
  return (
    <div>
      <div className={styles.order__number}>주문번호 : 1111111</div>
      <div className={styles.orders}>
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

  const [valueStars, setValueStars] = useState<number | null>(5);
  return (
    <div className={styles.order__container}>
      <div className={styles.order__img}>
        <img src={balloonImg} alt='balloonImg' />
      </div>
      <div className={styles.order__details}>
        <p>상품명 : 풍선</p>
        <p>상품가격 : 2000원</p>
        <p>수량 : 5개</p>
      </div>
      <div className={styles.order__buttons}>
        <Button onClick={() => navigate('/cart')} sx={{ marginBottom: '20px' }}>
          장바구니
        </Button>
        <React.Fragment>
          <Button onClick={handleOpen}>리뷰작성</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box
              component='form'
              noValidate
              autoComplete='off'
              className={styles.modal__inner}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                <div className={styles.modal__details}>
                  <img src={balloonImg} alt='balloonImg' />
                  <div className={styles.modal__details__container}>
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
              <Box
                component='form'
                noValidate
                autoComplete='off'
                sx={{
                  marginTop: '20px', // 수정 계획
                  width: '100%',
                }}
              >
                <TextField
                  id='outlined-multiline-static'
                  label='리뷰 작성'
                  multiline
                  rows={10}
                  value={value}
                  onChange={handleInputChange}
                  sx={{ my: 2, width: '100%' }}
                />
              </Box>
              <Button onClick={handleOpenReview}>리뷰 등록</Button>
            </Box>
          </Modal>{' '}
          <Modal
            open={reviewOpen}
            onClose={handleCloseReview}
            aria-labelledby='child-modal-title'
            aria-describedby='child-modal-description'
          >
            <Box
              className={`${styles.modal__inner} ${styles.modal__inner__nest}`}
            >
              <p id='child-modal-title'>리뷰가 등록 되었습니다</p>
              <Button onClick={handleCloseReview}>리뷰 닫기</Button>
            </Box>
          </Modal>
        </React.Fragment>
      </div>
    </div>
  );
};

// 검색 로직 구현 안 했음 - 여유 되면 구현
