// src/components/SignIn.tsx
import React, { useState } from 'react';
import { getUsers } from '../userServices';
import { User } from '../../types/type';

const SignIn: React.FC = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const users: User[] = await getUsers();
    const user = users.find(
      u => u.userLoginId === loginId && u.userPassword === password
    );
    if (user) {
      alert('Login successful!');
      // 로그인 정보를 전역 관리 또는 페이지 전환 등의 추가 로직
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="Login ID"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Sign In</button>
    </div>
  );
};

export default SignIn;
