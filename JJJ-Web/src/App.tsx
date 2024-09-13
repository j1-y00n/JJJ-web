// 신승주
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Payment from './pages/Payment';
import Company from './pages/Company';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CreateUsedProduct from './pages/CreateUsedProduct';
import UsedProductList from './pages/UsedProductList';
import { FixedStore } from './stores/Fixed.store';
import FloatingActionButtons from './components/FabIcon';
import ScrollToTop from './utils/scrollToTop';
import { ProductStore } from './stores/Product.store';
import { useEffect } from 'react';
import { UserStore } from './stores/User.store';

function App() {
  const { isFixed } = FixedStore();
  const { products, fetchProducts } = ProductStore();
  const location = useLocation();
  const { setUser } = UserStore();

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
    }
  }, [location.state, setUser]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className={`${isFixed ? 'fixed' : ''}`}>
      <FloatingActionButtons />
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/myPage/*' element={<MyPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search/:query?' element={<Search />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/company' element={<Company />} />
        <Route path='/category/:categoryName' element={<ProductList />} />
        <Route
          path='/category/:categoryName/product/:productId'
          element={<ProductDetail />}
        />
        <Route path='/createUsedProduct' element={<CreateUsedProduct />} />
        <Route path='/UsedProductList' element={<UsedProductList />} />
      </Routes>
    </div>
  );
}

export default App;
