// 신승주
import styles from '../styles/pages/OrderedList.module.css';
export default function OrderedList() {
  return (
    <div className={styles.ordered__list__container}>
      <ul className={styles.navbar}>
        <li>주문내역</li>
        <li>회원수정</li>
        <li>찜목록</li>
        <li>내게시물</li>
      </ul>
      <div className={styles.ordered__list}>ddd</div>
    </div>
  );
}
