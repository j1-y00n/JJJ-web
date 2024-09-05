import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import styles from '../styles/pages/ProductList.module.css';
import SearchBar from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { ProductStore } from '../stores/Product.store';
import { Product } from '../components/Product';
import { navigateProduct } from '../utils/navigateProduct';
import { FilterStore } from '../stores/Filter.store';
import { filterAndSortProducts } from '../utils/filterAndSortProducts';
import { ProductWithReviews } from '../types/type';
import { usePagination } from '../hooks/usePagination';
import PaginationNav from '../components/PaginationNav';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { products, fetchProducts } = ProductStore();
  const { activeAge, activeSorting } = FilterStore();
  const [searchedProducts, setSearchedProducts] = useState<
    ProductWithReviews[]
  >([]);
  const { handleProductClick } = navigateProduct();

  useEffect(() => {
    if (query) {
      const filteredProducts = products.filter((product) =>
        product.productTitle.toLowerCase().includes(query.toLowerCase())
      );
      setSearchedProducts(filteredProducts);
    }
    const fetchData = async () => {
      try {
        if (products.length === 0) {
          await fetchProducts();
        }
      } catch (error) {
        console.error('Failed to fetch', error);
      }
    };
    fetchData();
  }, [query, products]);

  const sortedProducts = filterAndSortProducts({
    products: searchedProducts,
    activeAge,
    activeSorting,
  });

  // Pagination
  const { displayedItems, currentPage, itemsPerPage, paginate, totalItems } =
    usePagination({ data: sortedProducts, itemsPerPage: 20 });

  return (
    <div className='flex__container'>
      <Header />
      <SearchBar />
      <section className={styles.searched__query}>
        <p>자주 찾는 키워드 : 세트, 별, 우주</p>
        <p>
          검색된 키워드 : <strong>{query}</strong>
        </p>
      </section>
      <Filter />
      <section className={styles.productList}>
        {displayedItems.length > 0 ? (
          displayedItems.map((product) => {
            return (
              <Product
                key={product.id}
                productThumbnail={product.productThumbnail}
                productTitle={product.productTitle}
                productPrice={product.productPrice}
                reviewRating={product.reviewRating}
                reviewCount={product.reviewCount}
                onClick={() => handleProductClick(product.id)}
              />
            );
          })
        ) : (
          <>
            <div className={styles.no__product}>
              <h3>이용 가능한 상품이 없습니다</h3>
            </div>
          </>
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
