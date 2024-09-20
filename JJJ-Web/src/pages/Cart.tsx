// 변지윤
// 장바구니
import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/Cart.module.css';
import Footer from '../components/Footer';
import { Checkbox, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useCounter } from '../hooks/useCounter';
import ClearIcon from '@mui/icons-material/Clear';
import Header from '../components/Header';
import ModalIsDelete from '../components/ModalIsDelete';
import { useOpenModal } from '../hooks/useOpenModal';
import { Cart as CartType, Product } from '../types/type';
import {
  deleteCart,
  getCartById,
  getCarts,
  updateCartProduct,
} from '../services/cartServices';
import { getProducts } from '../services/productServices';
import { useSelectableList } from '../hooks/useSelectableList';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../stores/User.store';

interface CustomSelectProps {
  allSelected: boolean; // 전체 선택 여부
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void; // 전체 선택/해제 이벤트 핸들러
  handleDeleteSelected: () => void; // 선택된 항목 삭제 함수
}

// Select component
export const CustomSelect = ({
  allSelected,
  handleSelectAll,
  handleDeleteSelected,
}: CustomSelectProps) => {
  // 삭제 모달
  const isDelete = useOpenModal();

  return (
    <div className={styles.cart__select}>
      <div className={styles.select__total}>
        <Checkbox
          checked={allSelected}
          onChange={handleSelectAll}
          color='primary'
        />
        <div className={styles.select__total__title}>전체선택</div>
      </div>
      <div className={styles.select__delete}>
        <Button color='info' onClick={isDelete.handleOpenModal}>
          <ClearIcon sx={{ fontSize: '14px' }} /> 선택삭제
        </Button>
        <ModalIsDelete
          isOpen={isDelete.isOpen}
          handleCloseModal={isDelete.handleCloseModal}
          handleDeleteContent={handleDeleteSelected}
        />
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
  product: Product;
  handleDeleteCart?: () => void;
  handleDeleteWishList?: () => void;
  isChecked: boolean;
  handleCheck: () => void;
}

export const CustomProduct = ({
  descClassName,
  imgClassName,
  titleClassName,
  contextClassName,
  product,
  handleDeleteCart,
  handleDeleteWishList,
  isChecked,
  handleCheck,
}: CustomProductProps) => {
  // 삭제 모달
  const isDelete = useOpenModal();

  const handleDelete = () => {
    if (handleDeleteCart) {
      handleDeleteCart();
    } else if (handleDeleteWishList) {
      handleDeleteWishList();
    }
  };

  return (
    <div
      className={`${styles.list__desc} ${descClassName ? descClassName : ''}`}
    >
      <IconButton
        className={styles.btn__delete}
        onClick={isDelete.handleOpenModal}
      >
        <ClearIcon sx={{ fontSize: '16px' }} />
      </IconButton>
      <ModalIsDelete
        isOpen={isDelete.isOpen}
        handleCloseModal={isDelete.handleCloseModal}
        handleDeleteContent={handleDelete}
      />
      <div className={styles.desc__container}>
        <Checkbox checked={isChecked} onChange={handleCheck} color='primary' />
        <img
          src={product.productThumbnail}
          alt={product.productTitle}
          className={`${styles.desc__image} ${
            imgClassName ? imgClassName : ''
          }`}
        />
        <div>
          <div
            className={`${styles.title__font} ${
              titleClassName ? titleClassName : ''
            }`}
          >
            {product.productTitle}
          </div>
          <div
            className={`${styles.context__font} ${
              contextClassName ? contextClassName : ''
            }`}
          >
            {product.productPrice} 원
          </div>
        </div>
      </div>
    </div>
  );
};

// checkbox label
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Cart() {
  const [carts, setCarts] = useState<CartType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const navigate = useNavigate();
  const { user } = UserStore();
  useEffect(() => {
    const fetchCarts = async () => {
      const fetchedCarts = await getCarts();
      setCarts([...fetchedCarts].reverse());
    };
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchCarts();
    fetchProducts();
  }, []);

  const userFilterCart = carts.filter(
    (cart) => String(cart.userId) === String(user?.id)
  );

  // deleteItems 함수를 수정하여 선택된 항목들을 삭제
  const deleteItems = async (ids: number[]) => {
    try {
      for (const id of ids) {
        await deleteCart(id);
      }
      setCarts((prev) => prev.filter((cart) => !ids.includes(cart.id)));
      setCheckedItems((prev) => prev.filter((itemId) => !ids.includes(itemId)));
      alert('SUCCESS cart delete');
    } catch (error) {
      console.log(error);
      alert('FAIL cart delete');
    }
  };

  const { selectedIds, handleCheck, handleSelectAll, handleDeleteSelected } =
    useSelectableList(userFilterCart, (item) => item.id);

  const handleDeleteSelectedCart = () => {
    handleDeleteSelected(deleteItems); // 수정된 함수 사용
  };

  const allSelected =
    userFilterCart.length > 0 && selectedIds.size === userFilterCart.length;

  // 수량 기능
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    cartId: number,
    product: Product
  ) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거
    const newQuantity = numericValue === '' ? 1 : Number(numericValue);
    handleQuantityChange(cartId, newQuantity, product);
  };

  // 포커스 잃을 때 유효성 검사
  const handleBlur = (
    itemQuantity: number,
    cartId: number,
    product: Product
  ) => {
    if (itemQuantity < 1) {
      handleQuantityChange(cartId, 1, product); // 수량을 1로 고정
    }
  };

  // 수량 변경 함수
  const handleQuantityChange = async (
    cartId: number,
    newQuantity: number,
    product: Product
  ) => {
    const existingCart = carts.find((cart) => cart.id == cartId);
    if (!existingCart) return;

    const totalPrice = product && product.productPrice * newQuantity;

    try {
      const updateCart = {
        ...existingCart,
        cartQuantity: newQuantity,
        cartTotalPrice: totalPrice,
      };
      await updateCartProduct(updateCart, Number(existingCart.id));

      // 장바구니 상태 업데이트
      setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.id === cartId
            ? { ...cart, cartQuantity: newQuantity, cartTotalPrice: totalPrice }
            : cart
        )
      );
    } catch (error) {
      console.error('FAIL to update cart quantity', error);
    }
  };
  const toPayCarts = userFilterCart.filter((cart) => selectedIds.has(cart.id));
  const totalPriceOfCarts = toPayCarts
    .map((cart) => cart.cartTotalPrice)
    .reduce((acc, price) => acc + price, 0);
  const totalNumberOfCarts = selectedIds.size;

  return (
    <div className='flex__container'>
      <Header />
      <div className={styles.cart__container}>
        <div className={styles.cart__title}>장바구니</div>

        {/* 선택박스 */}
        <CustomSelect
          allSelected={allSelected}
          handleSelectAll={handleSelectAll}
          handleDeleteSelected={handleDeleteSelectedCart}
        />

        {/* 상품리스트 */}
        <div className={styles.cart__list__container}>
          {userFilterCart.length > 0 ? (
            userFilterCart.map((item) => {
              const product = products.find(
                (p) => Number(p.id) === Number(item.productId)
              );

              if (!product) {
                return;
              }
              return (
                <div className={styles.list__container__inner} key={item.id}>
                  <CustomProduct
                    product={product}
                    handleDeleteCart={() => deleteItems([item.id])}
                    isChecked={selectedIds.has(item.id)}
                    handleCheck={() => handleCheck(item.id)}
                  />

                  <div className={styles.list__quantity}>
                    <div className={styles.title__font}>상품 주문 수량</div>
                    <div>
                      <IconButton
                        className={styles.btn__quantity}
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            Math.max(item.cartQuantity - 1, 1),
                            product
                          )
                        }
                      >
                        <RemoveIcon sx={{ fontSize: '18px' }} />
                      </IconButton>
                      <TextField
                        id='outlined'
                        type='text'
                        value={item.cartQuantity}
                        onChange={(e) =>
                          handleChange(
                            e as React.ChangeEvent<HTMLInputElement>,
                            item.id,
                            product
                          )
                        }
                        onBlur={() =>
                          handleBlur(item.cartQuantity, item.id, product)
                        }
                        InputProps={{
                          sx: {
                            padding: '0 !important',
                            width: '50px',
                            height: '28px',
                            margin: '0 5px',
                            '& .MuiInputBase-input': {
                              textAlign: 'center',
                            },
                          },
                        }}
                      />
                      <IconButton
                        className={styles.btn__quantity}
                        onClick={() =>
                          handleQuantityChange(
                            item.id,
                            item.cartQuantity + 1,
                            product
                          )
                        }
                      >
                        <AddIcon sx={{ fontSize: '18px' }} />
                      </IconButton>
                    </div>
                  </div>

                  <div className={styles.list__price}>
                    <div className={styles.title__font}>상품금액</div>
                    <div className={styles.context__font}>
                      {product && product.productPrice * item.cartQuantity} 원
                    </div>
                  </div>

                  <div className={styles.list__delivery}>
                    <div className={styles.title__font}>배송비</div>
                    <div className={styles.context__font}>무료</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.no__cart}>
              <h3>장바구니에 담긴 상품이 없습니다</h3>
              <Button onClick={() => navigate('/')} sx={{ mt: 3 }}>
                쇼핑하러 가기
              </Button>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginBottom: '50px', width: '100%' }}>
        <Footer />
      </div>

      {/* FIXED */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <div className={styles.fixed__price}>
            총 {totalNumberOfCarts}건 주문금액 {totalPriceOfCarts}원
          </div>
          <Button
            className={styles.fixed__order}
            onClick={() =>
              navigate('/payment', {
                state: { carts: toPayCarts },
              })
            }
          >
            주문하기
          </Button>
        </div>
      </div>
    </div>
  );
}
