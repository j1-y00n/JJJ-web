import { Button } from '@mui/material';
import styles from '../styles/components/PaginationNav.module.css';
import useActiveState from '../hooks/useActiveState';

interface PaginationNavProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

export default function PaginationNav({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: PaginationNavProps) {
  const { activeState, handleStateChange } = useActiveState(1);
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPageGroup = Math.ceil(currentPage / 5);
  const startPage = (currentPageGroup - 1) * 5 + 1;
  const endPage = Math.min(currentPageGroup * 5, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      {startPage > 1 && (
        <Button
          onClick={() => paginate(startPage - 5)}
          className={styles.page__item}
        >
          Previous
        </Button>
      )}
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => {
            paginate(number);
            handleStateChange(number);
          }}
          className={`${styles.page__item} ${
            activeState === number ? 'active' : ''
          }`}
        >
          {number}
        </Button>
      ))}
      {endPage < totalPages && (
        <Button
          onClick={() => paginate(startPage + 5)}
          className={styles.page__item}
        >
          Next
        </Button>
      )}
    </nav>
  );
}
