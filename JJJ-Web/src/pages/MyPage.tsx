// 신승주
import styles from '../styles/pages/MyPage.module.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import OrderedList from './OrderedList';
import EditUser from './EditUser';
import WishList from './WishList';
import MyUsedProduct from './MyUsedProduct';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material';

export default function MyPage() {
  return (
    <div className='flex__container'>
      <Header />
      <div className={styles.myPage__inner}>
        <MyPageLinks />
        <Routes>
          <Route path='/' element={<OrderedList />} />
          <Route path='editUser' element={<EditUser />} />
          <Route path='wishList' element={<WishList />} />
          <Route path='myUsedProduct' element={<MyUsedProduct />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

// MyPageLinks - 네비바
interface IPages {
  [key: string]: string;
}

const pages: IPages = {
  '/': '주문내역',
  editUser: '회원수정',
  wishList: '찜목록',
  myUsedProduct: '나의중고상품',
};

const MyPageLinks = () => {
  const links: string[] = ['/', 'editUser', 'wishList', 'myUsedProduct'];

  return (
    <ul className={styles.navbar}>
      <h2 className={styles.navbar__title}>마이페이지</h2>
      {links.map((link) => (
        <NavLink
          className={({ isActive }) =>
            `${styles.nav__link} ${isActive ? styles.active : ''}`
          }
          key={link}
          to={link === '/' ? '' : link}
          end
        >
          <Button
            className={styles.nav__btn}
            sx={{
              width: '90%',
              fontSize: 'var(--font-size-regular)',
              marginBottom: '20px',
            }}
          >
            {pages[link]}
          </Button>
        </NavLink>
      ))}
    </ul>
  );
};
