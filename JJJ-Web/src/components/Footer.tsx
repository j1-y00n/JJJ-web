// 변지윤
import { useNavigate } from 'react-router-dom';
import styles from  '../styles/components/Footer.module.css';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__map} onClick={() => navigate('/company')}>
            <p>제이스 장난감 백화점</p>
            <p>(찾아오시는 길)</p>
        </div>
        <div className={styles.footer__detail}>
          <p>전화번호 : 000-0000-0000</p>
          <p>이메일 : JJJ@DepartmentStore.com</p>
          <p>주소 : 부산광역시 부산진구 중앙대로 668, 에이원프라자 4층</p>
        </div>
      </div>
    </footer>
  );
}
