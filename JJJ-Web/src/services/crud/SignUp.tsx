// src/components/SignUp.tsx
import React, { useState } from 'react';
import { createUser } from '../userServices';
import { User } from '../../types/type';

const SignUp: React.FC = () => {
  const [user, setUser] = useState<Omit<User, 'userId'>>({
    userLoginId: '',
    userPassword: '',
    userName: '',
    userPhone: '',
    userEmail: '',
    userAddress: '',
    userAddressDetail: '',
    userGender: 'other',
    userBirth: '',
    userSignUpDate: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(user);
      alert('User successfully created!');
      // 회원가입 성공 후 추가 로직 (페이지 전환 또는 기타 로직 설정)
    } catch (error) {
      console.error(error);
      alert('Failed to create user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userLoginId"
        value={user.userLoginId}
        onChange={handleChange}
        placeholder="Login ID"
      />
      <input
        type="password"
        name="userPassword"
        value={user.userPassword}
        onChange={handleChange}
        placeholder="Password"
      />
      <input
        type="text"
        name="userName"
        value={user.userName}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="userPhone"
        value={user.userPhone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <input
        type="email"
        name="userEmail"
        value={user.userEmail}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="userAddress"
        value={user.userAddress}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        type="text"
        name="userAddressDetail"
        value={user.userAddressDetail}
        onChange={handleChange}
        placeholder="Address Detail"
      />
      <select
        name="userGender"
        value={user.userGender}
        onChange={handleChange}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        type="date"
        name="userBirth"
        value={user.userBirth}
        onChange={handleChange}
        placeholder="Birth Date"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
