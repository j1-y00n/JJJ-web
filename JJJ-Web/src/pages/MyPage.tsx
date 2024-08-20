// 신승주
import styles from '../styles/pages/MyPage.module.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import OrderedList from './OrderedList';
import EditUser from './EditUser';
import WishList from './WishList';
import MyUsedProduct from './MyUsedProduct';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@mui/material';
import useActiveState from '../hooks/useActiveState';
import { FixedStore } from '../stores/Fixed.store';

export default function MyPage() {
  const { isFixed } = FixedStore();
  return (
    <div className={`flex__container ${isFixed ? 'fixed' : ''}`}>
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
  const { activeState, handleStateChange } = useActiveState(links[0]);
  const navigate = useNavigate();
  return (
    <ul className={styles.navbar}>
      {links.map((link) => (
        <Button
          key={link}
          className={activeState === link ? 'active' : ''}
          onClick={() => {
            navigate(link === '/' ? '' : link);
            handleStateChange(link);
          }}
          sx={{
            border: '1px solid var(--color-black)',
            margin: '10px',
            fontSize: 'var(--font-size-regular)',
          }}
        >
          {pages[link]}
        </Button>
      ))}
    </ul>
  );
};
