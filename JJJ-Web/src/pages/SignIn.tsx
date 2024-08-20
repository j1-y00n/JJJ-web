// 신승주

import React, { useRef, useState } from 'react';
import styles from '../styles/pages/SingIn.module.css';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Header';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';

interface SignUpForm {
  id: number;
  userId: string;
  password: string;
  name: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 1,
    userId: '',
    password: '',
    name: '',
  });

  const nextId = useRef(2);

  const [errors, setErrors] = useState<SignUpForm>({
    id: 1,
    userId: '',
    password: '',
    name: '',
  });

  const { userId, password, name } = formData;

  const validateId = (userId: string): boolean => {
    return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,}$/.test(userId);
  };

  const validatePassword = (password: string): boolean => {
    return /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let tempErrors = {
      id: 1,
      userId: '',
      password: '',
      name: '',
    };

    let isValid = true;

    if (
      !userId ||
      !validateId(userId) ||
      !password ||
      !validatePassword(password)
    ) {
      tempErrors.userId = `
      아이디 또는 비밀번호를 잘못 입력했습니다.
      입력하신 내용을 다시 확인해주세요.
      `;
      // alert('아이디 확인을 완료해주세요');
      isValid = false;
    }

    setErrors(tempErrors);

    if (isValid) {
      console.log('회원 가입 데이터: ', formData);
      alert(`로그인 성공!! ${name}님!! `);
      navigate('/');
      setFormData({
        id: nextId.current,
        userId: '',
        password: '',
        name: '',
      });

      nextId.current += 1;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className='flex__container'>
      <Logo />
      <div className={styles.login__section}>
        <form className={styles.login__form} onSubmit={handleSubmit}>
          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>아이디</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type='text'
                  className={styles.input}
                  name='userId'
                  placeholder='4글자 이상 영문과 숫자 조합'
                  value={userId}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.input__container}>
            <div className={styles.input__wrapper}>
              <div className={styles.label__box}>
                <label>비밀번호</label>
              </div>
              <div className={styles.input__box}>
                <input
                  type='text'
                  className={styles.input}
                  name='password'
                  placeholder='8 ~ 12자의 영문과 숫자 조합'
                  value={password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {errors.userId || errors.password ? (
              <p className={styles.error}>{errors.userId}</p>
            ) : (
              ' '
            )}
          </div>

          <FormGroup
            sx={{
              marginRight: 'auto',
              marginLeft: '40px',
            }}
          >
            <FormControlLabel control={<Switch />} label='로그인 상태 유지' />
          </FormGroup>

          <div className={styles.button__container}>
            <Button
              type='submit'
              sx={{
                width: '100%',
                fontSize: 'var(--font-size-medium)',
              }}
            >
              로그인
            </Button>
          </div>
        </form>
      </div>
      <ul className={styles.action__container}>
        <li>아이디 찾기</li>
        <li>비밀번호 찾기</li>
        <li className={styles.sing__up} onClick={() => navigate('/signUp')}>
          회원 가입
        </li>
      </ul>
    </div>
  );
}
