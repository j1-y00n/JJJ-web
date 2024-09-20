// 신승주
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/components/SearchBar.module.css';
import { useInput } from '../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useKeyDown } from '../hooks/useKeydown';
export default function SearchBar() {
  const { value, handleInputChange, reset } = useInput('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!value) {
      return;
    }
    navigate(`/search?query=${value}`);
    reset();
  };
  const handleKeyDown = useKeyDown(handleSearch);

  return (
    <section className={styles.search}>
      <label htmlFor='search__input'>통합검색</label>
      <div className={styles.input__wrapper}>
        <input
          id='search__input'
          type='text'
          placeholder='검색어를 입력해주세요.'
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          className='round'
          color='secondary'
          onClick={handleSearch}
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '10px',
          }}
        >
          <SearchIcon sx={{ fontSize: 'var(--font-size-large)' }} />
        </IconButton>
      </div>
    </section>
  );
}
