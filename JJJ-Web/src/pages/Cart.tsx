// 변지윤
// 장바구니
import React from 'react'
import styles from '../styles/pages/Cart.module.css';
import Footer from '../components/Footer';
import exampleImg from '../assets/images/cars.jpg';

export default function Cart() {
  return (
    <>
      <div className={styles.cart}>
        <div className={styles.cart__container}>
          <div className={styles.cart__title}>장바구니</div>

          {/* 선택박스 */}
          <div className={styles.cart__select}>
            <div className={styles.select__total}>
              <input type="checkbox" />
              <div className={styles.select__total__title}>전체선택</div>
            </div>
            <div className={styles.select__delete}>
              <div className={styles.select__delete__title}>X 선택삭제</div>
            </div>
          </div>

          {/* 상품리스트 */}
          <div className={styles.cart__list__container}>
            <div className={styles.list__container__inner}>
              <div className={styles.list__desc}>
                <button className={styles.desc__delete__btn}>X</button>
                <div className={styles.desc__container}>
                  <input type="checkbox" />
                  <img src={exampleImg} alt="상품이미지" className={styles.desc__image} />
                  <div>
                    <div>상품명</div>
                    <div>금액</div>
                  </div>
                </div>
              </div>
              <div className={styles.list__quantity}>
                <div>상품 주문 수량</div>
                <div>
                  <button>-</button>
                  <input type="number" />
                  <button>+</button>
                </div>
              </div>
              <div className={styles.list__price}>
                <div>상품금액</div>
                <div>0000원</div>
              </div>
              <div className={styles.list__delivery}>
                <div>배송비</div>
                <div>무료</div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* FIXED */}
      <div className={styles.fixed__container}>
        <div className={styles.fixed__inner}>
          <div className={styles.fixed__price}>총 0건 주문금액 00000원</div>
          <div className={styles.fixed__order}>주문하기</div>
        </div>
      </div>

      <div style={{marginBottom: '50px'}}>
        <Footer />
      </div>
    </>
  )
}
