import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div>
      {/* 중고상품등록페이지 */}
      <Routes>
        <Route path='/' element={<Home />} />
        {/* 여기 아래 부터는 commit 안한 내용들 */}
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/myPage/*' element={<MyPage />} />
        <Route path='/carts' element={<Carts />} />
        <Route path='/search' element={<ProductSearch />}/>
        <Route path='/register-used-products' element={<RegisterUsedProducts />}/>
        <Route path='/payment' element={<Payment />} />
        <Route path='/about' element={<About />} />h
      </Routes>
      {/* 마이페이지 안에 라우트 */}
      <Routes>
        {/* 모든경로 앞에 /myPage/ 로 시작됨 */}
        <Route path='/' element={<OrderDetails />} />
        <Route path='editUser' element={<EditUser />} />
        <Route path='wishList' element={<WishList />} />
        <Route path='myItems' element={<MyItems />} />
      </Routes>
      {/* 마이페이지 끝 */}

      {/* 네비바 안에 라우트 */}
      <Routes>
        <Route path='/category/gifts' element={<ProductList category="gifts" />} />
        <Route path='/category/intelligence' element={<ProductList category="intelligence" />} />
        <Route path='/category/fiveSenses' element={<ProductList category="fiveSenses" />} />
        <Route path='/category/emotion' element={<ProductList category="emotion" />} />
        <Route path='/category/social' element={<ProductList category="social" />} />
        <Route path='/category/usedProducts' element={<ProductList category="usedProducts" />} />
        <Route path='/category/:categoryId/product/:productId' element={<ProductDetail />} />
      </Routes>
      {/* 네비바 끝 */}

      {/* 제품 상세 페이지 안에 라우트 */}
     {/* 모든경로 앞에 /category/:categoryId/product/:productId/ 로 시작됨 */}
      <Routes>
        <Route path="description" element={<ProductDescription />} />
        <Route path="reviews" element={<ProductReviews />} />
        <Route path="qa" element={<ProductQA />} />
      </Routes>
      {/* 제품 상세 페이지 끝 */}
    </div>
  );
}

export default App;
