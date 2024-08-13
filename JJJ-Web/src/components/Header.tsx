// 박용재
import styles from "../styles/components/Header.module.css";
import cars from "../assets/images/cars.jpg";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div id={styles.home}>
      <div className={styles.header}>
        <div className={styles.top_header}>
          <div className={styles.box_head_content}>
            <div className={styles.main_icon}>제이스 JJJ</div>
          </div>
        </div>
      </div>

      <div className={styles.second_header}>
        {/* li 태그 안에 button 속성 */}
        <div className={styles.middle_header}>
          <div className={styles.text_container}>
            <ul className={styles.page_title_list}>
              <li>
                <a href="" className="present">
                  선물
                </a>
              </li>
              <li>
                <a href="" className="intelligent_improvement">
                  지능발달
                </a>
              </li>
              <li>
                <a href="" className="senses_improvement">
                  오감발달
                </a>
              </li>
              <li>
                <a href="" className="emotion_improvement">
                  정서발달
                </a>
              </li>
              <li>
                <a href="" className="society_improvement">
                  사회발달
                </a>
              </li>
              <li>
                <NavLink to="/MyUsedProduct">
                  <a href="" className="used_product">
                    중고상품
                  </a>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.icon_container}>
            <div className={styles.box_mytools}>
              <ul className={styles.list_login}>
                <li>
                  <NavLink to="/SignIn">
                    <a href="" className={styles.login}>
                      로그인
                    </a>
                  </NavLink>
                </li>
              </ul>

              <ul className={styles.list_signup}>
                <li>
                  <NavLink to="/SignUp">
                    <a href="" className={styles.signup}>
                      회원가입
                    </a>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className={styles.box_icons}>
              <ul className={styles.icon_area}>
                <li>
                  <NavLink to="/Search">
                    <a href="" className={styles.search_icon}>
                      <SearchIcon sx={{ fontSize: "30px" }} />
                    </a>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Mypage">
                    <a href="" className={styles.my_page}>
                      <PermIdentityOutlinedIcon sx={{ fontSize: "30px" }} />
                    </a>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Cart">
                    <a href="" className={styles.shopping_icon}>
                      <ShoppingBagOutlinedIcon sx={{ fontSize: "30px" }} />
                    </a>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}
