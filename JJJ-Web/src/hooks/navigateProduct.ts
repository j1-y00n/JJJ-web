import { useNavigate } from 'react-router-dom';

export function navigateProduct() {
  const navigate = useNavigate();

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return { handleProductClick };
}
