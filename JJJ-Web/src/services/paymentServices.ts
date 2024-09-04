import axios from 'axios';
import { Payment } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getPayments = async (): Promise<Payment[]> => {
  const response = await axios.get<Payment[]>(`${LOCALHOST_PORT}/payments`);
  return response.data;
};

export const getPaymentsById = async (id: number): Promise<Payment[]> => {
  const response = await axios.get<Payment[]>(`${LOCALHOST_PORT}/payments`);
  const payments = response.data.filter((payment) => payment.userId === id);
  if (!payments) {
    throw new Error(`payments with userId ${id} not found`);
  }
  return payments;
};
