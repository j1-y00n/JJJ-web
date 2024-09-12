// 신승주
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/pages/ProductList.module.css';
import { useParams } from 'react-router-dom';
import Filter from '../components/Filter';
import { Product } from '../components/Product';
import { FilterStore } from '../stores/Filter.store';
import { navigateProduct } from '../utils/navigateProduct';
import { ProductStore } from '../stores/Product.store';
import { filterAndSortProducts } from '../utils/filterAndSortProducts';
import { useEffect, useState } from 'react';
import PaginationNav from '../components/PaginationNav';
import { usePagination } from '../hooks/usePagination';
import {
  getCategories,
  getProductCategories,
} from '../services/categoryServices';
import { Category, ProductCategory, categoryNameType } from '../types/type';
export default function ProductList() {
  const { products } = ProductStore();
  const { activeAge, activeSorting } = FilterStore();
  const { handleProductClick } = navigateProduct();
  const { categoryName } = useParams<{ categoryName: categoryNameType }>();
  const [productCategory, setProductCategory] = useState<ProductCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getCategories();
        const productCategoriesData = await getProductCategories();
        setCategories(categories);
        setProductCategory(productCategoriesData);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchData();
  }, []);

  const filterCategory = () => {
    if (categoryName) {
      const findCategoryId = Number(
        categories.find((cat) => cat.categoryName === categoryName)?.id
      );
      if (findCategoryId) {
        const filterCategory = productCategory
          .filter((pc) => pc.categoryId === findCategoryId)
          .map((pc) => pc.productId);

        return products.filter((product) =>
          filterCategory.includes(Number(product.id))
        );
      }
    }
    return products;
  };

  const categoryFilteredProducts = filterCategory();

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
