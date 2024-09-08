// 변지윤
// 장바구니
import React, { ReactNode, useEffect, useState } from 'react'
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
import { deleteCart, getCarts } from '../services/cartServices';
import { getProducts } from '../services/productServices';
import { useSelectableList } from '../hooks/useSelectableList';


interface CustomSelectProps {
  allSelected: boolean; // 전체 선택 여부
  handleSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void; // 전체 선택/해제 이벤트 핸들러
  handleDeleteSelected: () => void; // 선택된 항목 삭제 함수
};

// Select component
export const CustomSelect = ({ allSelected, handleSelectAll, handleDeleteSelected }: CustomSelectProps) => {
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
        <Button 
          color='info' 
          onClick={isDelete.handleOpenModal}
        >
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

export const CustomProduct = ({ descClassName, imgClassName, titleClassName, contextClassName, product, handleDeleteCart, handleDeleteWishList, isChecked, handleCheck }: CustomProductProps) => {
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
    <div className={`${styles.list__desc} ${descClassName ? descClassName : ''}`}>
      <IconButton 
        className={styles.btn__delete}
        onClick={isDelete.handleOpenModal}
      >
        <ClearIcon 
          sx={{ fontSize: '16px' }} 
        />
      </IconButton>
      <ModalIsDelete
        isOpen={isDelete.isOpen}
        handleCloseModal={isDelete.handleCloseModal}
        handleDeleteContent={handleDelete}
      />
      <div className={styles.desc__container}>
        <Checkbox 
          checked={isChecked}
          onChange={handleCheck}
          color='primary' 
        />
        <img 
          src={product.productThumbnail} 
          alt={product.productTitle} 
          className={`${styles.desc__image} ${imgClassName ? imgClassName : ''}`} 
        />
        <div>
          <div className={`${styles.title__font} ${titleClassName ? titleClassName : ''}`}>
            {product.productTitle}
          </div>
          <div className={`${styles.context__font} ${contextClassName ? contextClassName : ''}`}>
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

  useEffect(() => {
    const fetchCarts = async () => {
      const fetchedCarts = await getCarts();
      setCarts(fetchedCarts);
    };
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchCarts();
    fetchProducts();
  }, []);

  const userFilterCart = carts.filter((cart) => cart.userId === 1);

  // deleteItems 함수를 수정하여 선택된 항목들을 삭제
  const deleteItems = async (ids: number[]) => {
    try {
      for (const id of ids) {
        await deleteCart(id);
      }
      setCarts(prev => prev.filter(cart => !ids.includes(cart.id)));
      setCheckedItems(prev => prev.filter(itemId => !ids.includes(itemId)));
      alert('SUCCESS cart delete');
    } catch (error) {
      console.log(error);
      alert('FAIL cart delete');
    }
  };

  const {
    selectedIds,
    handleCheck,
    handleSelectAll,
    handleDeleteSelected,
  } = useSelectableList(userFilterCart, item => item.id);

  const handleDeleteSelectedCart = () => {
    handleDeleteSelected(deleteItems); // 수정된 함수 사용
  };

  const allSelected = userFilterCart.length > 0 && selectedIds.size === userFilterCart.length;


  // 수량 기능
  const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거

    if (numericValue === '') {
      setCounter(0); // 빈 문자열일 경우 0으로 설정
    } else {
      setCounter(Number(numericValue));
    }
  };

  // 포커스 잃을 때 유효성 검사
  const handleBlur = () => {
    if (count < 1) {
      setCounter(1); // 숫자가 1보다 작으면 1로 고정
    }
  };

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

        {userFilterCart.map(item => {
            const product = products.find(p => Number(p.id) === Number(item.productId));

          return(
          <div 
            className={styles.list__container__inner}
            key={item.id}
          >
            {product && (
              <CustomProduct 
                product={product} 
                handleDeleteCart={() => deleteItems([item.id])}
                isChecked={selectedIds.has(item.id)}
                handleCheck={() => handleCheck(item.id)}
              />
            )}
            <div className={styles.list__quantity}>
              <div className={styles.title__font}>상품 주문 수량</div>
              <div>
                <IconButton className={styles.btn__quantity} onClick={decreaseCounter}>
                  <RemoveIcon sx={{ fontSize: '18px' }} />
                </IconButton>
                <TextField
                  id='outlined'
                  type='text'
                  // value={count}
                  value={item.cartQuantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                <IconButton className={styles.btn__quantity} onClick={increaseCounter}>
                  <AddIcon sx={{ fontSize: '18px' }} />
                </IconButton>
              </div>
            </div>

            <div className={styles.list__price}>
              <div className={styles.title__font}>상품금액</div>
              <div className={styles.context__font}>{item.cartTotalPrice} 원</div>
            </div>

            <div className={styles.list__delivery}>
              <div className={styles.title__font}>배송비</div>
              <div className={styles.context__font}>무료</div>
            </div>
          </div>
          );
        })}

        </div>
      </div>

      <div style={{marginBottom: '50px', width: '100%'}}>
        <Footer />
      </div>

      {/* FIXED */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <div className={styles.fixed__price}>총 0건 주문금액 000000원</div>
          <Button className={styles.fixed__order}>주문하기</Button>
        </div>
      </div>
    </div>
  );
};











// export default function Cart() {
//   const [carts, setCarts] = useState<CartType[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   // 선택된 아이템들
//   const [checkedItems, setCheckedItems] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchCarts = async () => {
//       const fetchedCarts = await getCarts();
//       setCarts(fetchedCarts);
//     };
//     const fetchProducts = async () => {
//       const fetchedProducts = await getProducts();
//       setProducts(fetchedProducts);
//     };
//     fetchCarts();
//     fetchProducts();
//   },[]);

//   // 로그인된 유저 필터링
//   const userFilterCart = carts.filter((cart) => 
//     cart.userId === 1
//   );

//   // 장바구니 제품 삭제
//   const deleteItems = async (ids: number[]) => {
//     try {
//       for (const id of ids) {
//         await deleteCart(id);
//       }
//       setCarts(prev => prev.filter(cart => !ids.includes(cart.id)));
//       setCheckedItems(prev => prev.filter(itemId => !ids.includes(itemId)));
//       alert('SUCCESS cart delete');
//     } catch (error) {
//       console.log(error);
//       alert('FAIL cart delete');
//     }
//   };

//   // 단일 아이템 삭제
//   const handleDeleteCart = (id: number) => {
//     deleteItems([id]);
//   };

//   // 체크박스로 선택된 아이템 삭제
//   const handleDeleteSelected = () => {
//     if (checkedItems.length > 0) {
//       deleteItems(checkedItems);
//     } else {
//       alert('No items selected for deletion');
//     }
//   };

//   // 체크박스 상태 업데이트
//   const handleCheckItem = (id: number) => {
//     setCheckedItems((prev) =>
//       prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
//     );
//   };

//   // 전체 선택 및 해제
//   const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.checked) {
//       const allItemIds = userFilterCart.map(cart => cart.id);
//       setCheckedItems(allItemIds);
//     } else {
//       setCheckedItems([]);
//     }
//   };

//   const allSelected = userFilterCart.length > 0 && checkedItems.length === userFilterCart.length;


//   // 수량 기능
//   const { count, setCounter, increaseCounter, decreaseCounter } = useCounter(1);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     const numericValue = value.replace(/\D/g, ''); // 숫자 이외의 값 제거

//     if (numericValue === '') {
//       setCounter(0); // 빈 문자열일 경우 0으로 설정
//     } else {
//       setCounter(Number(numericValue));
//     }
//   };

//   // 포커스 잃을 때 유효성 검사
//   const handleBlur = () => {
//     if (count < 1) {
//       setCounter(1); // 숫자가 1보다 작으면 1로 고정
//     }
//   };

//   return (
//     <div className='flex__container'>
//       <Header />
//       <div className={styles.cart__container}>
//         <div className={styles.cart__title}>장바구니</div>

//         {/* 선택박스 */}
//         <CustomSelect
//         allSelected={allSelected}
//         handleSelectAll={handleSelectAll}
//         handleDeleteSelected={handleDeleteSelected}
//       />

//         {/* 상품리스트 */}
//         <div className={styles.cart__list__container}>

//         {userFilterCart.map(item => {
//             const product = products.find(p => Number(p.id) === Number(item.productId));

//           return(
//           <div 
//             className={styles.list__container__inner}
//             key={item.id}
//           >
//             {product && (
//               <CustomProduct 
//                 product={product} 
//                 handleDeleteCart={() => handleDeleteCart(item.id)}
//                 isChecked={checkedItems.includes(item.id)}
//                 handleCheck={() => handleCheckItem(item.id)}
//               />
//             )}
//             <div className={styles.list__quantity}>
//               <div className={styles.title__font}>상품 주문 수량</div>
//               <div>
//                 <IconButton className={styles.btn__quantity} onClick={decreaseCounter}>
//                   <RemoveIcon sx={{ fontSize: '18px' }} />
//                 </IconButton>
//                 <TextField
//                   id='outlined'
//                   type='text'
//                   // value={count}
//                   value={item.cartQuantity}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   InputProps={{
//                     sx: {
//                       padding: '0 !important',
//                       width: '50px',
//                       height: '28px',
//                       margin: '0 5px',
//                       '& .MuiInputBase-input': {
//                         textAlign: 'center',
//                       },
//                     },
//                   }}
//                 />
//                 <IconButton className={styles.btn__quantity} onClick={increaseCounter}>
//                   <AddIcon sx={{ fontSize: '18px' }} />
//                 </IconButton>
//               </div>
//             </div>

//             <div className={styles.list__price}>
//               <div className={styles.title__font}>상품금액</div>
//               <div className={styles.context__font}>{item.cartTotalPrice} 원</div>
//             </div>

//             <div className={styles.list__delivery}>
//               <div className={styles.title__font}>배송비</div>
//               <div className={styles.context__font}>무료</div>
//             </div>
//           </div>
//           );
//         })}

//         </div>
//       </div>

//       <div style={{marginBottom: '50px', width: '100%'}}>
//         <Footer />
//       </div>

//       {/* FIXED */}
//       <div className={styles.fixed__container}>
//         <div className={styles.fixed__inner}>
//           <div className={styles.fixed__price}>총 0건 주문금액 000000원</div>
//           <Button className={styles.fixed__order}>주문하기</Button>
//         </div>
//       </div>
//     </div>
//   );
// };