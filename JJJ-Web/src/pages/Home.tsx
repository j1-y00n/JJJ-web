// 신승주
import React from 'react';
import Header from '../components/Header';
import Slider from '../components/Slider';
import SearchBar from '../components/SearchBar';
import BestItems from '../components/BestItems';
import BestReviews from '../components/BestReviews';
import Footer from '../components/Footer';
import styles from '../styles/pages/Home.module.css';


// import SlidersampleA from '../assets/images/balloon.jpg';
// import SlidersampleB from '../assets/images/boardgame.jpg';
// import SlidersampleC from '../assets/images/book.jpg';
// import SlidersampleD from '../assets/images/cars.jpg';
// import SlidersampleE from '../assets/images/exam02.jpg';



export default function Home() {

  // const images = [
  //   SlidersampleA,
  //   SlidersampleB,
  //   SlidersampleC,
  //   SlidersampleD,
  //   SlidersampleE,
  // ];

  return (
    <div className={styles.home__container}>
      {/* Header, Slider - 용재님 */}
      {/* BestItems, Footer - 지윤님 */}
      <Header />
      <Slider />
      <SearchBar />
      <BestItems />
      <BestReviews />
      <Footer />
    </div>
  );
}
