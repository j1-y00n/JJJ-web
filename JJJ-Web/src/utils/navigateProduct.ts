import { useNavigate } from 'react-router-dom';
import { CategoryType } from '../types/TempMockdata';

export function navigateProduct() {
  const navigate = useNavigate();

  const handleProductClick = (
    productId: number,
    categoryId?: CategoryType | undefined
  ) => {
    navigate(`/category/${categoryId}/product/${productId}`);
  };

  return { handleProductClick };
}
