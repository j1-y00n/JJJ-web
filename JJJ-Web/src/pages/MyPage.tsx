import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import OrderedList from './OrderedList';
import EditUser from './EditUser';
import WishList from './WishList';
import MyUsedProduct from './MyUsedProduct';

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

export default function MyPage() {
  return (
    <div>
      <TempLinks />
      <Routes>
        <Route path='/' element={<OrderedList />} />
        <Route path='editUser' element={<EditUser />} />
        <Route path='wishList' element={<WishList />} />
        {/* 나의 중고 상품 */}
        <Route path='myUsedProduct' element={<MyUsedProduct />} />
      </Routes>
    </div>
  );
}
