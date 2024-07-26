// 신승주
import React from 'react';
import styles from '../styles/pages/MyPage.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import OrderedList from './OrderedList';
import EditUser from './EditUser';
import WishList from './WishList';
import MyUsedProduct from './MyUsedProduct';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { theme } from '../styles/theme';

interface IPages {
  [key: string]: string;
}

const pages: IPages = {
  '/': '주문내역',
  editUser: '회원수정',
  wishList: '찜목록',
  myUsedProduct: '나의중고상품',
};

const TempLinks = () => {
  const links: string[] = ['/', 'editUser', 'wishList', 'myUsedProduct'];

  return (
    <ul
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: '10px',
        padding: '10px 20px',
        border: '1px solid black',
        borderRadius: '5px',
      }}
    >
      {links.map((link) => (
        <NavLink
          key={link}
          to={link === '/' ? '' : link}
          style={({ isActive }) => ({
            textDecoration: 'none',
            color: isActive ? 'white' : 'black',
            fontWeight: isActive ? 'bold' : 'normal',
            padding: '10px 15px',
            borderRadius: '5px',
            margin: '5px',
            backgroundColor: isActive ? 'red' : 'lightgray',
          })}
        >
          {pages[link]}
        </NavLink>
      ))}
    </ul>
  );
};

const MyPageLinks = () => {
  const links: string[] = ['/', 'editUser', 'wishList', 'myUsedProduct'];
  return (
    <ul className={styles.navbar}>
      {links.map((link) => (
        <NavLink
          key={link}
          to={link === '/' ? '' : link}
          className={styles.navbar__li}
          style={({ isActive }) => ({
            color: isActive ? 'white' : 'black',
            fontWeight: isActive ? 'bold' : 'normal',
            backgroundColor: isActive
              ? `${theme.palette.primary.main}`
              : 'white',
          })}
        >
          {pages[link]}
        </NavLink>
      ))}
    </ul>
  );
};

export default function MyPage() {
  return (
    <>
      <TempLinks />
      <div className={styles.myPage__container}>
        <Header />
        <div className={styles.myPage__inner}>
          <MyPageLinks />
          <Routes>
            <Route path='/' element={<OrderedList />} />
            <Route path='editUser' element={<EditUser />} />
            <Route path='wishList' element={<WishList />} />
            {/* 나의 중고 상품 */}
            <Route path='myUsedProduct' element={<MyUsedProduct />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}
