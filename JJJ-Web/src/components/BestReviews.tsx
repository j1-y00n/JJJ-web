import styles from '../styles/components/BestReviews.module.css';
import BestReview from './BestReview';
export default function BestReviews() {
  return (
    <section className={styles.best__reviews}>
      <h3>베스트 리뷰</h3>
      <div className={styles.grid__items}>
        <BestReview />
        <BestReview />
        <BestReview />
        <BestReview />
      </div>
    </section>
  );
}
