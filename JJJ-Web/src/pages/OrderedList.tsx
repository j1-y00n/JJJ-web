// 신승주
import styles from '../styles/pages/OrderedList.module.css';
import balloonImg from '../assets/images/balloon.jpg';
import { Box, Button, TextField } from '@mui/material';
import Footer from '../components/Footer';

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
        <Button variant='contained' sx={{ marginBottom: '20px' }}>
          장바구니
        </Button>
        <Button variant='contained'>리뷰작성</Button>
      </div>
    </div>
  );
};
