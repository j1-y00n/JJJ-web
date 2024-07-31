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
import { useState } from 'react';
import { useInputFile } from '../hooks/useInputfile';

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
  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];

      console.log(file);
    }
  };
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
        <Button onClick={handleOpen} variant='contained'>
          리뷰작성
        </Button>{' '}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box className={styles.modal__inner}>
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
                        defaultValue={2.5}
                        precision={0.5}
                      />
                    </Stack>
                  </div>
                </div>
              </div>
            </Typography>
            <UploadInput />
            <Typography id='modal-modal-description' sx={{ my: 3 }}>
              상세리뷰 Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Suscipit atque quas voluptatum fugiat, quisquam eius soluta libero
              eveniet quidem, possimus quasi saepe id assumenda illum magnam
              placeat aliquam deserunt totam. Lorem ipsum, dolor sit amet
              consectetur adipisicing elit. Suscipit atque quas voluptatum
              fugiat, quisquam eius soluta libero eveniet quidem, possimus quasi
              saepe id assumenda illum magnam placeat aliquam deserunt
              totam.Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </Typography>
            <button
              className={`${styles.review__submit} ${styles.label__button}`}
            >
              리뷰 등록
            </button>
          </Box>
        </Modal>
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
          이미지 등록
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
