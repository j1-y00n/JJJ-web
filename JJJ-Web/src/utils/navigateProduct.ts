import { useNavigate } from 'react-router-dom';
import { Category, categoryNameType, ProductCategory } from '../types/type';
import { useEffect, useState } from 'react';
import {
  getCategories,
  getProductCategories,
} from '../services/categoryServices';

export function navigateProduct() {
  const [productCategories, setProductCategories] =
    useState<ProductCategory[]>();
  const [category, setCategory] = useState<Category[]>();
  useEffect(() => {
    const fetchData = async () => {
      const productCategories = await getProductCategories();
      setProductCategories(productCategories);
      const category = await getCategories();
      setCategory(category);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    const categoryId = productCategories?.find(
      (pc) => pc.productId === Number(productId)
    )?.categoryId;

    const categoryName = category?.find(
      (c) => Number(c.id) === categoryId
    )?.categoryName;
    navigate(`/category/${categoryName}/product/${productId}`);
  };

  return { handleProductClick };
}
