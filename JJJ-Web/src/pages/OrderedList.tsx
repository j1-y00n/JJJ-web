// 신승주
import styles from '../styles/pages/OrderedList.module.css';
import balloonImg from '../assets/images/balloon.jpg';
import {
  Box,
  Button,
  IconButton,
  Modal,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks/useInput';
import { useOpenModal } from '../hooks/useOpenModal';
import { ModalCart } from '../components/ModalCart';
import UploadFile from '../components/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import ModalIsDelete from '../components/ModalIsDelete';
import { Payment, Product } from '../types/type';
import { getProductById } from '../services/productServices';
import { getPaymentsByUserId } from '../services/paymentServices';

type PaymentGroupType = { [key: string]: Payment[] };

export default function OrderedList() {
  const { value, handleInputChange } = useInput('');
  const [payments, setPayments] = useState<Payment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const payments = await getPaymentsByUserId(1);
      setPayments(payments);
    };
    fetchData();
  }, []);

  const paymentGroups: PaymentGroupType = {};
  payments.forEach((payment) => {
    const orderDate = payment.paymentTimestamp;
    if (!paymentGroups[orderDate]) {
      paymentGroups[orderDate] = [];
    }
    paymentGroups[orderDate].push(payment);
  });

  console.log(paymentGroups);

  const groupedOrders = Object.keys(paymentGroups).map((timestamp) => ({
    orderTimestamp: timestamp,
    payments: paymentGroups[timestamp],
  }));

  const sortedLatestOrders = [...groupedOrders].reverse();
  console.log(sortedLatestOrders);

  return (
    <div className={styles.ordered__list}>
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{
          display: 'flex',
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

      {sortedLatestOrders.map((orders) => (
        <Orders
          key={orders.orderTimestamp}
          orderTimestamp={orders.orderTimestamp}
          payments={orders.payments}
        />
      ))}
    </div>
  );
}

interface OrdersProps {
  orderTimestamp: string;
  payments: Payment[];
}

const Orders = ({ orderTimestamp, payments }: OrdersProps) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useOpenModal();

  const totalPrice = payments.reduce(
    (acc, price) => acc + Number(price.paymentTotalPrice),
    0
  );

  console.log(payments);
  return (
    <div className={styles.orders}>
      <div className={styles.order__number}>
        <div className={styles.order__info}>
          <span>주문번호 : {new Date(orderTimestamp).getTime()} / </span>
          <span>주문날짜 : {new Date(orderTimestamp).toLocaleString()} / </span>
          <span>총 결제금액 : {totalPrice}원</span>
        </div>
        <IconButton sx={{ padding: '3px' }} onClick={handleOpenModal}>
          <ClearIcon sx={{ fontSize: '16px' }} />
        </IconButton>
        <ModalIsDelete isOpen={isOpen} handleCloseModal={handleCloseModal} />
      </div>
      {payments.map((order) => (
        <Order key={order.id} {...order} />
      ))}
    </div>
  );
};

const Order = ({
  id,
  paymentTimestamp,
  paymentTotalPrice,
  userId,
  productId,
  paymentQuantity,
}: Payment) => {
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const fetchData = async () => {
      const product = await getProductById(productId);
      setProduct(product);
    };
    fetchData();
  }, [productId]);
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

  // 장바구니 모달
  const { isOpen, handleOpenModal, handleCloseModal } = useOpenModal();
  const customPosition = { left: 55, top: 10 };

  return (
    <div className={styles.order__container}>
      <div className={styles.order__img}>
        <img src={product?.productThumbnail} alt={product?.productTitle} />
      </div>
      <div className={styles.order__details}>
        <p>{product?.productTitle}</p>
        <p>{product?.productPrice}원</p>
        <p>수량 : {paymentQuantity}개</p>
        <p>총 상품금액 : {paymentTotalPrice}원</p>
      </div>
      <div className={styles.order__buttons}>
        <Button onClick={handleOpenModal} sx={{ marginBottom: '20px' }}>
          장바구니
        </Button>
        <ModalCart
          isOpen={isOpen}
          handleCloseModal={handleCloseModal}
          customStyles={customPosition}
        />
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
              <UploadFile />
              <Box
                component='form'
                noValidate
                autoComplete='off'
                sx={{
                  width: '100%',
                  margin: '4px 0',
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
          </Modal>
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
