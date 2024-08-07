// 변지윤
// 찜 리스트
import React from 'react'
import styles from '../styles/pages/WishList.module.css'
import { CustomProduct, CustomSelect } from './Cart'


export default function WishList() {
  return (
    <div className={styles.wish__container}>
      <CustomSelect />
      <CustomProduct descClassName={styles.wish__desc} imgClassName={styles.wish__img} titleClassName={styles.wish__title} contextClassName={styles.wish__context} />
      <CustomProduct descClassName={styles.wish__desc} imgClassName={styles.wish__img} titleClassName={styles.wish__title} contextClassName={styles.wish__context} />
      <CustomProduct descClassName={styles.wish__desc} imgClassName={styles.wish__img} titleClassName={styles.wish__title} contextClassName={styles.wish__context} />

    </div>

  )
}
