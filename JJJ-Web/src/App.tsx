import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Cart from './pages/Cart';
import Search from './components/Search';
import Payment from './pages/Payment';
import Company from './pages/Company';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CreateUsedProduct from './pages/CreateUsedProduct';
import TempNaviBar from './components/TempNaviBar';

function App() {
  return (
    <div>
      <TempNaviBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/myPage/*' element={<MyPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search' element={<Search />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/company' element={<Company />} />
        <Route path='/category/:categoryId' element={<ProductList />} />
        <Route
          path='/category/:categoryId/product/:productId'
          element={<ProductDetail />}
        />
        {/* 중고 상품 등록 페이지 */}
        <Route path='/createUsedProduct' element={<CreateUsedProduct />} />
      </Routes>
    </div>
  );
}

export default App;
