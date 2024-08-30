// 신승주
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/pages/ProductList.module.css';
import { useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import { Product } from '../components/Product';
import { CategoryType } from '../types/Product.type';
import { FilterStore } from '../stores/Filter.store';
import { navigateProduct } from '../utils/navigateProduct';
import { ProductStore } from '../stores/Product.store';
import { filterAndSortProducts } from '../utils/filterAndSortProducts';
import { useState } from 'react';
import PaginationNav from '../components/PaginationNav';
import { usePagination } from '../hooks/usePagination';

export default function ProductList() {
  const { products } = ProductStore();
  const { activeAge, activeSorting } = FilterStore();
  const { categoryId } = useParams<{ categoryId: CategoryType }>();
  const { handleProductClick } = navigateProduct();
  const categoryFilteredProducts = categoryId
    ? products.filter((product) => product.productCategory.includes(categoryId))
    : products;

  const sortedProducts = filterAndSortProducts({
    products: categoryFilteredProducts,
    activeAge,
    activeSorting,
  });

  // Pagination
  const { displayedItems, currentPage, itemsPerPage, paginate, totalItems } =
    usePagination({ data: sortedProducts, itemsPerPage: 20 });

  return (
    <div className='flex__container'>
      <Header />
      <Filter />
      <section className={styles.productList}>
        {displayedItems.length > 0 ? (
          displayedItems.map((product) => (
            <Product
              key={product.productId}
              imgSrc={product.productImg}
              title={product.productTitle}
              price={product.productPrice}
              rating={product.productRating}
              ratingCount={product.productRatingCount}
              onClick={() => handleProductClick(product.productId, categoryId)}
            />
          ))
        ) : (
          <div className={styles.no__product}>
            <h3>이용 가능한 상품이 없습니다</h3>
          </div>
        )}
      </section>
      <PaginationNav
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        paginate={paginate}
        currentPage={currentPage}
      />
      <Footer />
    </div>
  );
}
