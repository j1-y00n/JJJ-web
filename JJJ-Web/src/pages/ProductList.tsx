// 신승주
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Button, Container } from '@mui/material';
import BestItems from '../components/BestItems';
import styles from '../styles/pages/ProductList.module.css';
import { theme } from '../styles/theme';
import { NavLink } from 'react-router-dom';
import Filter from '../components/Filter';

export default function ProductList() {
  return (
    <div className={styles.productList__container}>
      <Header />
      <Filter />
      <BestItems />
      <Footer />
      <NavLink to='/createUsedProduct'>
        <Button
          variant='contained'
          sx={{ position: 'fixed', bottom: '30px', right: '150px' }}
        >
          중고 상품 등록 +
        </Button>
      </NavLink>
    </div>
  );
}
