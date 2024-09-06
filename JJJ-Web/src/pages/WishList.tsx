// 변지윤
// 찜 리스트
import React, { useEffect, useState } from 'react'
import styles from '../styles/pages/WishList.module.css'
import { CustomProduct, CustomSelect } from './Cart'
import { Product, WishList as WishListType } from '../types/type';
import { deleteWishList, getWishLists } from '../services/wishListServices';
import { getProducts } from '../services/productServices';


export default function WishList() {
  const [wishLists, setWishLists] = useState<WishListType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedWishLists, setSelectedWishLists] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState(false);

  useEffect(() => {
    const fetchWishLists = async () => {
      const fetchedWishLists = await getWishLists();
      const filterUser = fetchedWishLists.filter(i => i.userId === 1);
      setWishLists(filterUser);
    };
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchWishLists();
    fetchProducts();
  },[]);

  // 전체 선택/해제 처리
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedWishLists([]); // 전체 해제
    } else {
      const allIds = wishLists.map(wish => wish.id);
      setSelectedWishLists(allIds); // 전체 선택
    }
    setAllSelected(!allSelected);
  };

  // 개별 체크박스 변경 처리
  const handleCheckboxChange = (id: number) => {
    if (selectedWishLists.includes(id)) {
      setSelectedWishLists(selectedWishLists.filter(wishId => wishId !== id)); // 선택 해제
    } else {
      setSelectedWishLists([...selectedWishLists, id]); // 선택 추가
    }
  };

  // 선택된 항목 삭제 처리
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedWishLists.map(id => deleteWishList(id)));
      setWishLists(prev => prev.filter(wish => !selectedWishLists.includes(wish.id)));
      setSelectedWishLists([]); // 선택 항목 초기화
      setAllSelected(false); // 전체선택 초기화
      alert('SUCCESS selected wishlist delete');
    } catch (error) {
      console.log(error);
      alert('FAIL selected wishlist delete');
    }
  };

  // 개별 아이템 삭제 처리
  const handleDeleteWishList = async (id: number) => {
    try {
      await deleteWishList(id);
      setWishLists(wishLists.filter((wish) => wish.id !== id));
      alert('SUCCESS wishlist delete');
    } catch (error) {
      console.log(error);
      alert('FAIL wishlist delete');
    }
  };

  return (
    <div className={styles.wish__container}>
      <CustomSelect 
        allSelected={allSelected}
        handleSelectAll={handleSelectAll}
        handleDeleteSelected={handleDeleteSelected}
      />

      {wishLists.map(item => {
        const product = products.find(p => Number(p.id) === Number(item.productId));
        const isSelected = selectedWishLists.includes(item.id); // 개별 아이템 선택 상태

        return (
          <div key={item.id}>
            {product && (    
              <CustomProduct 
                descClassName={styles.wish__desc} 
                imgClassName={styles.wish__img} 
                titleClassName={styles.wish__title} 
                contextClassName={styles.wish__context}
                product={product}
                handleDeleteWishList={() => handleDeleteWishList(item.id)}
                isChecked={isSelected}
                handleCheck={() => handleCheckboxChange(item.id)}
              />
            )}
          </div>
        )
      })}

    </div>
  )
}