import { useState } from 'react';

export function useCounter(initialValue: number) {
  const [count, setCounter] = useState(initialValue);

  const increaseCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const decreaseCounter = () => {
    if (count <= 1) {
      return;
    }
    setCounter((prev) => prev - 1);
  };

  return { count, setCounter, increaseCounter, decreaseCounter };
}
