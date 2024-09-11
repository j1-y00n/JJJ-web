// src/services/userService.ts
import axios from 'axios';
import { User } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${LOCALHOST_PORT}/users`);
  return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const response = await axios.get(`${LOCALHOST_PORT}/users/${id}`);
  return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const response = await axios.post(`${LOCALHOST_PORT}/users`, user);
  return response.data;
};

export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const response = await axios.put(`${LOCALHOST_PORT}/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${LOCALHOST_PORT}/${id}`);
};
