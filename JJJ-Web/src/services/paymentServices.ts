import axios from 'axios';
import { Payment } from '../types/type';
import { LOCALHOST_PORT } from '../constants/api';

export const getPayments = async (): Promise<Payment[]> => {
  const response = await axios.get<Payment[]>(`${LOCALHOST_PORT}/payments`);
  return response.data;
};

export const getPaymentsByUserId = async (
  userId: number
): Promise<Payment[]> => {
  const response = await axios.get<Payment[]>(`${LOCALHOST_PORT}/payments`);
  const payments = response.data.filter((payment) => payment.userId === userId);
  if (!payments) {
    throw new Error(`payments with userId ${userId} not found`);
  }
  return payments;
};

export const deletePayment = async (paymentId: number): Promise<void> => {
  await axios.delete<Payment[]>(`${LOCALHOST_PORT}/payments/${paymentId}`);
};

export const createPayment = async (
  payment: Omit<Payment, 'id'>
): Promise<Payment> => {
  const response = await axios.post<Payment>(
    `${LOCALHOST_PORT}/payments`,
    payment
  );
  return response.data;
};
