// 신승주

import React, { useState } from 'react';
import styles from '../styles/pages/SingIn.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Header';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { getUsers } from '../services/userServices';
import { User } from '../types/type';

export default function SignIn() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string | undefined>(undefined);
  const [isRememberLogin, setIsRememberLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users: User[] = await getUsers();
      const user = users.find(
        (user) => user.userLoginId === loginId && user.userPassword === password
      );

      if (!user) {
        setErrors(`아이디 또는 비밀번호를 잘못 입력했습니다.
          입력하신 내용을 다시 확인해주세요.`);
        return;
      }

      if (isRememberLogin) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      if (state) {
        navigate(state, { state: { user } });
      } else {
        navigate('/', { state: { user } });
      }
      setLoginId('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex__container'>
      <div className={styles.logo__container}>
        <Logo />
      </div>
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
                  name='loginId'
                  placeholder='4글자 이상 영문과 숫자 조합'
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {errors && <p className={styles.error}>{errors}</p>}
          </div>

          <FormGroup
            sx={{
              marginRight: 'auto',
              marginLeft: '40px',
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isRememberLogin}
                  onChange={() => setIsRememberLogin(!isRememberLogin)}
                />
              }
              label='로그인 상태 유지'
            />
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
