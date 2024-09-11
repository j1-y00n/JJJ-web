// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { User } from '../../types/type';
import { getUsers, deleteUser } from '..//userServices';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      // setUsers(users.filter((user) => user.id !== id));
      alert('User successfully deleted');
    } catch (error) {
      console.error(error);
      alert('Failed to delete user');
    }
  };

  //# 해당 로직 처럼 사용자 정보를 모두 출력하는 경우는 거의 없습니다.
  // : 회원가입이나 기타 회원 정보가 필요한 로직에서 참고해주세요

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.userName} ({user.userEmail})
            {/* <button onClick={() => handleDelete(user.id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
