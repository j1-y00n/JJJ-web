import { useState } from 'react';

type UseActiveStateReturn<T> = {
  activeState: T | null;
  handleStateChange: (value: T) => void;
  handleToggle: () => void;
};

export default function useActiveState<T>(
  initialValue: T | null = null
): UseActiveStateReturn<T> {
  const [activeState, setActiveState] = useState<T | null>(initialValue);

  const handleStateChange = (value: T) => {
    setActiveState(value);
  };

  const handleToggle = () => {
    if (typeof activeState === 'boolean') {
      setActiveState((prevState) => !prevState as T);
    }
  };

  return { activeState, handleStateChange, handleToggle };
}
