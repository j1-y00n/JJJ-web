// 신승주
import styles from '../styles/components/Search.module.css';

export default function SearchBar() {
  return (
    <section className={styles.search}>
      <label htmlFor='search__input'>통합검색</label>
      <input
        id='search__input'
        type='text'
        placeholder='검색어를 입력해주세요.'
      />
    </section>
  );
}
