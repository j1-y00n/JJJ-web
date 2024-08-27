// src/components/UserUpdate.tsx
import React, { useState, useEffect } from 'react';
import { getUserById, updateUser } from '../userServices';
import { User } from '../../types/type';

interface UserUpdateProps {
  userId: number;
}

const UserUpdate: React.FC<UserUpdateProps> = ({ userId }) => {
  const [user, setUser] = useState<Partial<User>>({});

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserById(userId);
      setUser(fetchedUser);
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(userId, user);
      alert('User successfully updated');
    } catch (error) {
      console.error(error);
      alert('Failed to update user');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="userName"
        value={user.userName || ''}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="userEmail"
        value={user.userEmail || ''}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* 필요한 추가 수정 정보 작성 */}
      <button type="submit">Update User</button>
    </form>
  );
};

export default UserUpdate;
