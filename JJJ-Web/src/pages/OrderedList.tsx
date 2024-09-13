// 신승주
import styles from '../styles/pages/OrderedList.module.css';
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
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useInput } from '../hooks/useInput';
import { useOpenModal } from '../hooks/useOpenModal';
import { ModalCart } from '../components/ModalCart';
import UploadFile from '../components/UploadFile';
import ClearIcon from '@mui/icons-material/Clear';
import ModalIsDelete from '../components/ModalIsDelete';
import { Payment, Product } from '../types/type';
import { getProductById } from '../services/productServices';
import {
  deletePayment,
  getPaymentsByUserId,
} from '../services/paymentServices';
import {
  createReview,
  getReviewQuery,
  getReviews,
} from '../services/reviewServices';
import { getNextId } from '../services/commonServices';
import { UserStore } from '../stores/User.store';

type PaymentGroupType = { [key: string]: Payment[] };

interface sortedPaymentsProps {
  orderId: string;
  orderTimestamp: string;
  payments: Payment[];
}

export default function OrderedList() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { value, handleInputChange } = useInput('');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [sortedLatestOrders, setSortedLatestOrders] = useState<
    sortedPaymentsProps[]
  >([]);
  const { user } = UserStore();
  useEffect(() => {
    const fetchData = async () => {
      // 로그인된 유저의 아이디
      if (!user) {
        return navigate('/signIn', { state: pathname });
      }
      const payments = await getPaymentsByUserId(Number(user.id));
      setPayments(payments);
      const paymentGroups: PaymentGroupType = {};
      payments.forEach((payment) => {
        const orderDate = payment.paymentTimestamp;
        if (!paymentGroups[orderDate]) {
          paymentGroups[orderDate] = [];
        }
        paymentGroups[orderDate].push(payment);
      });

      const groupedOrders = Object.keys(paymentGroups).map((timestamp) => ({
        orderId: `${user.id}-${new Date(timestamp).getTime()}`,
        orderTimestamp: new Date(timestamp).toLocaleString(),
        payments: paymentGroups[timestamp],
      }));

      const sortedLatestOrders = [...groupedOrders].reverse();
      setSortedLatestOrders(sortedLatestOrders);
    };
    fetchData();
  }, []);

  // 주문내역 삭제
  const handleDeletePayments = async (orderId: string) => {
    try {
      const paymentIdsToDelete =
        sortedLatestOrders
          .find((order) => order.orderId === orderId)
          ?.payments.map((payment) => payment.id) || [];

      for (const id of paymentIdsToDelete) {
        await deletePayment(id);
      }
      // await Promise.all(paymentIdsToDelete.map((id) => deletePayment(id)));

      setSortedLatestOrders(
        sortedLatestOrders.filter((orders) => orders.orderId !== orderId)
      );
      alert('SUCCESS orders delete');
    } catch (error) {
      console.error(error);
      alert('FAIL orders delete');
    }
  };

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
          key={orders.orderId}
          orderId={orders.orderId}
          orderTimestamp={orders.orderTimestamp}
          payments={orders.payments}
          handleDeletePayments={() => handleDeletePayments(orders.orderId)}
        />
      ))}
    </div>
  );
}

interface OrdersProps {
  orderId: string;
  orderTimestamp: string;
  payments: Payment[];
  handleDeletePayments: () => void;
}

const Orders = ({
  orderId,
  orderTimestamp,
  payments,
  handleDeletePayments,
}: OrdersProps) => {
  const { isOpen, handleOpenModal, handleCloseModal } = useOpenModal();

  const totalPrice = payments.reduce(
    (acc, price) => acc + Number(price.paymentTotalPrice),
    0
  );

  return (
    <div className={styles.orders}>
      <div className={styles.order__number}>
        <div className={styles.order__info}>
          <span>주문번호 : {orderId} </span>
          <span>주문날짜 : {orderTimestamp} / </span>
          <span>총 결제금액 : {totalPrice}원</span>
        </div>
        <IconButton sx={{ padding: '3px' }} onClick={handleOpenModal}>
          <ClearIcon sx={{ fontSize: '16px' }} />
        </IconButton>
        <ModalIsDelete
          isOpen={isOpen}
          handleCloseModal={handleCloseModal}
          handleDeleteContent={handleDeletePayments}
        />
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
  const handleRegisterReview = () => {
    handleClose();
    setReviewOpen(true);
  };
  const handleCloseReview = () => setReviewOpen(false);

  const { value, handleInputChange } = useInput('상세 내용');

  const [valueStars, setValueStars] = useState<number>(5);

  // 장바구니 모달
  const { isOpen, handleOpenModal, handleCloseModal } = useOpenModal();
  const customPosition = { left: 55, top: 10 };

  // 리뷰 작성
  const handleCheckMyReview = async () => {
    try {
      const hasReviewedProduct = await getReviewQuery(
        `userId=${userId}&productId=${productId}`
      );
      if (hasReviewedProduct.length > 0) {
        alert('해당 제품에 대한 리뷰를 이미 작성하셨습니다.');
        return;
      }
      handleOpen();
    } catch (error) {
      console.error('리뷰 작성 버튼 오류');
    }
  };
  const handleAddToReview = async () => {
    try {
      const reviews = await getReviews();
      const newReview = {
        id: getNextId(reviews),
        reviewContent: value,
        reviewRating: valueStars,
        productId,
        userId,
      };
      await createReview(newReview);
    } catch (error) {
      console.error('리뷰 추가에 실패했습니다.', error);
    }
  };

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
          <Button onClick={handleCheckMyReview}>리뷰작성</Button>
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
                  <img
                    src={product?.productThumbnail}
                    alt={product?.productTitle}
                  />
                  <div className={styles.modal__details__container}>
                    <p>상품명 : {product?.productTitle}</p>
                    <div className={styles.modal__rating}>
                      <p>평가 : </p>
                      <Stack spacing={1} ml={1}>
                        <Rating
                          name='half-rating'
                          precision={0.5}
                          value={valueStars}
                          onChange={(event, newValue) => {
                            setValueStars(Number(newValue));
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
              <Button
                onClick={() => {
                  handleAddToReview();
                  handleRegisterReview();
                }}
              >
                리뷰 등록
              </Button>
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
