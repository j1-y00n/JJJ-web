import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div>
      <div id="header">
        <div className={styles.top_header}>
          <div className={styles.main_icon}>제이스 JJJ</div>
          <a href='' className={styles.text_content}>
            <li className={styles.login}>로그인</li>
            <li className={styles.sign_up}>회원가입</li>
            <li className={styles.my_page}>마이페이지</li>
          </a>
        </div>

      {/* li 태그 안에 button 속성 */}
        <div className={styles.middle_header}>
          <div className={styles.middle_header_contianer}>
            <a href='' className={styles.page_title_list}>
              <li className="present">선물</li>
              <li className="intelligent_improvement">지능발달</li>
              <li className="senses_improvement">오감발달</li>
              <li className="emotion_improvement">정서발달</li>
              <li className="society_improvement">사회발달</li>
              <li className="used_product">중고상품</li>
            </a>

            <a href='' className={styles.search_basket}>
              <li className={styles.search_icon}>검색아이콘</li>
              <li className={styles.shopping_icon}>장바구니아이콘</li>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.navi_body}>
        <img className={styles.navi_image} src="" alt="" />
      </div>
    </div>

    
  )
}
