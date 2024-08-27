// src/services/userService.ts
import axios from 'axios';
import { User } from '../types/type';

const API_URL = 'http://localhost:5000/users'; // json-server의 기본 엔드포인트로 수정

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createUser = async (user: Omit<User, 'userId'>): Promise<User> => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
