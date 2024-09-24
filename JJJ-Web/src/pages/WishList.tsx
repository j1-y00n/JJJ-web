// 변지윤
// 찜 리스트
import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/WishList.module.css';
import { CustomProduct, CustomSelect } from './Cart';
import { Product, WishList as WishListType } from '../types/type';
import { deleteWishList, getWishLists } from '../services/wishListServices';
import { getProducts } from '../services/productServices';
import { useSelectableList } from '../hooks/useSelectableList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserStore } from '../stores/User.store';

export default function WishList() {
  const [wishLists, setWishLists] = useState<WishListType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { user } = UserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishLists = async () => {
      const fetchedWishLists = await getWishLists();
      const filterUser = fetchedWishLists.filter(
        (i) => Number(i.userId) === Number(user?.id)
      );
      setWishLists([...filterUser].reverse());
    };
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchWishLists();
    fetchProducts();
  }, []);

  const deleteItems = async (ids: number[]) => {
    try {
      for (const id of ids) {
        await deleteWishList(id);
      }
      setWishLists((prev) =>
        prev.filter((wishList) => !ids.includes(wishList.id))
      );
      alert('SUCCESS wishlist delete');
    } catch (error) {
      console.log(error);
      alert('FAIL wishlist delete');
    }
  };

  const { selectedIds, handleCheck, handleSelectAll, handleDeleteSelected } =
    useSelectableList(wishLists, (item) => item.id);

  const handleDeleteSelectedWishList = () => {
    handleDeleteSelected(deleteItems);
  };

  const allSelected =
    wishLists.length > 0 && selectedIds.size === wishLists.length;

  return (
    <div className={styles.wish__container}>
      <CustomSelect
        allSelected={allSelected}
        handleSelectAll={handleSelectAll}
        handleDeleteSelected={handleDeleteSelectedWishList}
      />

      {wishLists.length > 0 ? (
        wishLists.map((item) => {
          const product = products.find(
            (p) => Number(p.id) === Number(item.productId)
          );

          return (
            <div key={item.id}>
              {product && (
                <CustomProduct
                  descClassName={styles.wish__desc}
                  imgClassName={styles.wish__img}
                  titleClassName={styles.wish__title}
                  contextClassName={styles.wish__context}
                  product={product}
                  handleDeleteWishList={() => deleteItems([item.id])}
                  isChecked={selectedIds.has(item.id)}
                  handleCheck={() => handleCheck(item.id)}
                />
              )}
            </div>
          );
        })
      ) : (
        <div className={styles.no__wishList}>
          <h3>찜목록이 비어있습니다</h3>
          <Button onClick={() => navigate('/')} sx={{ mt: 3 }}>
            쇼핑하러 가기
          </Button>
        </div>
      )}
    </div>
  );
}
