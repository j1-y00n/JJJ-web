// 신승주
// ProductDetail에 대한 설정 해야 함
// 중고상품 등록은 중고 상품 안에 있어야 함
import { NavLink } from 'react-router-dom';

interface IPages {
  [key: string]: string;
}

export default function TempNaviBar() {
  const links: string[] = [
    '/',
    'signIn',
    'signUp',
    'myPage',
    'cart',
    'search',
    'payment',
    'company',
    'category/gift',
    'category/intelligence',
    'category/fiveSenses',
    'category/emotion',
    'category/society',
    'usedProductList',
    'createUsedProduct',
    'category/gift/product/1', // 임시 제품 상세 페이지
  ];

  const pages: IPages = {
    '/': '홈',
    signIn: '로그인',
    signUp: '회원가입',
    myPage: '마이페이지',
    cart: '장바구니',
    search: '검색',
    payment: '결제',
    company: '회사소개',
    'category/gift': '선물',
    'category/intelligence': '지능발달',
    'category/fiveSenses': '오감발달',
    'category/emotion': '정서발달',
    'category/society': '사회발달',
    usedProductList: '중고상품',
    createUsedProduct: '중고상품등록',
    'category/gift/product/1': '제품상세페이지', // 임시 제품 상세 페이지
  };
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
          to={link}
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
          {link === '/' ? '홈' : pages[link]}
        </NavLink>
      ))}
    </ul>
  );
}
