import React from 'react';
import Header from '../components/Header';
import Slider from '../components/Slider';
import Search from '../components/Search';
import BestItems from '../components/BestItems';
import BestReviews from '../components/BestReviews';
import Footer from '../components/Footer';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <div className={styles.home__container}>
      {/* Header, Slider - 용재님 */}
      {/* BestItems, Footer - 지윤님 */}
      <Header />
      <Slider />
      <Search />
      <BestItems />
      <BestReviews />
      <Footer />
    </div>
  );
}
