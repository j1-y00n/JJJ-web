// 신승주
import styles from '../styles/pages/OrderedList.module.css';
import balloonImg from '../assets/images/balloon.jpg';
import { Button } from '@mui/material';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { NavLink } from 'react-router-dom';

interface IPages {
  [key: string]: string;
}

const pages: IPages = {
  '/': '주문내역',
  editUser: '회원수정',
  wishList: '찜목록',
  myUsedProduct: '나의중고상품',
};
export default function OrderedList() {
  const links: string[] = ['/', 'editUser', 'wishList', 'myUsedProduct'];
  return (
    <>
      <Header />
      <div className={styles.ordered__list__container}>
        <ul className={styles.navbar}>
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
        <div className={styles.ordered__list}>
          <div className={styles.search}>검색바</div>
          <Order />
          <Order />
          <Order />
        </div>
      </div>
      <Footer />
    </>
  );
}

const Order = () => {
  return (
    <div className={styles.order__wrapper}>
      <div className={styles.order__number}>주문번호 : 1111111</div>
      <div className={styles.order__detail__wrapper}>
        <div className={styles.detail__left}>
          <img src={balloonImg} alt='balloonImg' />
        </div>
        <div className={styles.detail__middle}>
          <p>상품명 : 풍선</p>
          <p>상품가격 : 2000원</p>
          <p>수량 : 5개</p>
        </div>
        <div className={styles.order__right}>
          <Button variant='contained'>장바구니</Button>
          <Button variant='contained'>리뷰작성</Button>
        </div>
      </div>
    </div>
  );
};
