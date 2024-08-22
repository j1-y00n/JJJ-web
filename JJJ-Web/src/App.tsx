// 신승주
import { Route, Routes } from 'react-router-dom';
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

function App() {
  const { isFixed } = FixedStore();
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
        <Route path='/category/:categoryId' element={<ProductList />} />
        <Route
          path='/category/:categoryId/product/:productId'
          element={<ProductDetail />}
        />
        {/* 중고 상품 등록 페이지 */}
        <Route path='/createUsedProduct' element={<CreateUsedProduct />} />
        {/* 중고 상품 목록 페이지 */}
        <Route path='/UsedProductList' element={<UsedProductList />} />
      </Routes>
    </div>
  );
}

export default App;
