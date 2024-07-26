// 신승주
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filter from '../components/Filter';
import BestItems from '../components/BestItems';
import styles from '../styles/pages/ProductList.module.css';
import SearchBar from '../components/SearchBar';

export default function Search() {
  return (
    <div className={styles.productList__container}>
      <Header />
      <SearchBar />
      <Filter />
      <BestItems />
      <Footer />
    </div>
  );
}
