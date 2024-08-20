// 신승주
import Header from '../components/Header';
import Slider from '../components/Slider';
import SearchBar from '../components/SearchBar';
import BestItems from '../components/BestItems';
import BestReviews from '../components/BestReviews';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className='flex__container'>
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
