import { useState } from 'react';

type UseActiveStateReturn<T> = [T | null, (value: T) => void];

export default function useActiveState<T>(
  initialValue: T | null = null
): UseActiveStateReturn<T> {
  const [activeState, setActiveState] = useState<T | null>(initialValue);

  const handleStateChange = (value: T) => {
    setActiveState(value);
  };

  return [activeState, handleStateChange];
}