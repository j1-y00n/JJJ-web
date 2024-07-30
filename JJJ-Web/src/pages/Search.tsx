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
import { ProductProp } from '../types/TempMockdata';
import { useFilterStore } from '../stores/Filter.store';
import { filterAndSortProducts } from '../utils/filterAndSortProducts';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { products } = ProductStore();
  const { activeAge, activeSorting } = useFilterStore();
  const [searchedProducts, setSearchedProducts] = useState<ProductProp[]>([]);
  const { handleProductClick } = navigateProduct();

  useEffect(() => {
    if (query) {
      const filteredProducts = products.filter((product) =>
        product.productTitle.toLowerCase().includes(query.toLowerCase())
      );
      setSearchedProducts(filteredProducts);
    }
  }, [query, products]);

  const sortedProducts = filterAndSortProducts({
    products: searchedProducts,
    activeAge,
    activeSorting,
  });

  return (
    <div className={styles.productList__container}>
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
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <Product
              key={product.productId}
              imgSrc={product.productImg}
              title={product.productTitle}
              price={product.productPrice}
              rating={product.productRating}
              ratingCount={product.productRatingCount}
              onClick={() => handleProductClick(product.productId)}
            />
          ))
        ) : (
          <>
            <div className={styles.no__product}>
              <h3>이용 가능한 상품이 없습니다</h3>
            </div>
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}
