// 박용재
import styles from "../styles/components/Header.module.css";
import cars from "../assets/images/cars.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export default function Header() {
  return (
    <div>
      <div id="header">
        <div className={styles.top_header}>
          <div className={styles.box_head_content}>
            <div className={styles.main_icon}>제이스 JJJ</div>
          </div>
          
          <div className={styles.box_mytools}>
            <ul className={styles.list_mytools}>

              <li className={styles.list_login}>
                <a href="" className={styles.login}>
                  로그인
                </a>
              </li>
              <li className={styles.list_signup}>
                <a href="" className={styles.sign_up}>
                  회원가입
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* li 태그 안에 button 속성 */}
        <div className={styles.middle_header}>
          <div className={styles.middle_header_contianer}>
            <ul className={styles.page_title_list}>
              <a href="" className="present">
                선물
              </a>
              <a href="" className="intelligent_improvement">
                지능발달
              </a>
              <a href="" className="senses_improvement">
                오감발달
              </a>
              <a href="" className="emotion_improvement">
                정서발달
              </a>
              <a href="" className="society_improvement">
                사회발달
              </a>
              <a href="" className="used_product">
                중고상품
              </a>
            </ul>

            <ul className={styles.user_area}>
              <a href="" className={styles.search_icon}>
                <SearchIcon />
              </a>
              <a href="" className={styles.my_page}>
                <PermIdentityOutlinedIcon />
              </a>
              <a href="" className={styles.shopping_icon}>
                <ShoppingBagOutlinedIcon />
              </a>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.navi_body}>
        <img className={styles.navi_image} src='' alt="네비 이미지" />
      </div>
    </div>
  );
}
