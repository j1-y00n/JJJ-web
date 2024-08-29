// src/components/WithDraw.tsx
import React from 'react';
import { updateUser } from '../userServices';

interface WithDrawProps {
  userId: number;
}

const WithDraw: React.FC<WithDrawProps> = ({ userId }) => {
  const handleWithdraw = async () => {
    try {
      const withdrawDate = new Date().toISOString();
      await updateUser(userId, { userWithdrawDate: withdrawDate });
      alert('User successfully withdrawn');
    } catch (error) {
      console.error(error);
      alert('Failed to withdraw user');
    }
  };

  return (
    <button onClick={handleWithdraw}>Withdraw</button>
  );
};

export default WithDraw;
