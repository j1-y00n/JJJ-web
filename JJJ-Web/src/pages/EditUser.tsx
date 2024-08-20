// 변지윤
// 회원정보 수정
import React from 'react'
import styles from '../styles/pages/EditUser.module.css'
import { Button } from '@mui/material'

export default function EditUser() {

  return (
    <div className={styles.edit__container}>
      <div className={styles.edit__header}>회원정보수정</div>

      {/* 회원 정보 확인 */}
      <div>
        <div className={styles.edit__check__title}>회원정보 확인</div>
        <div>정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 입력해주세요</div>
        <div className={styles.edit__check__inner}>
          <div className={styles.edit__check__user__container}>
            <div>아이디</div>
            {/* 현재 아이디 데이터 */}
            <input 
              type='text' 
              className={styles.title__input} 
              // value={title} 
            />
          </div>
          <div className={styles.edit__check__user__container}>
            <div>비밀번호</div>
            <input 
              type='text' 
              className={styles.title__input} 
              // value={title} 
            />

          </div>
          <div className={styles.edit__check__select__container}>
            <Button color='info' className={styles.edit__check__btn}>취소</Button>
            <Button color='info' className={styles.edit__check__btn}>확인</Button>
          </div>
        </div>
      </div>


      {/* 회원 정보 수정 */}
    </div>
  )
}
