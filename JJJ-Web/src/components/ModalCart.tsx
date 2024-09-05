import { Button } from '@mui/material';
import styles from '../styles/components/ModalCart.module.css';

interface ModalCartProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  customStyles: {
    left: number;
    top: number;
  };
}
export function ModalCart({
  isOpen,
  handleCloseModal,
  customStyles,
}: ModalCartProps) {
  if (!isOpen) return null;
  setTimeout(() => {
    handleCloseModal();
  }, 3000);

  return (
    <div className={styles.modal__overlay} onClick={handleCloseModal}>
      <div className={styles.modal} style={customStyles}>
        <div
          className={styles.modal__content}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>장바구니에 담겼습니다</h2>
          <Button onClick={handleCloseModal} sx={{ padding: '5px 10px' }}>
            닫기
          </Button>
        </div>
        <div className={styles.arrow}></div>
      </div>
    </div>
  );
}
