import React from 'react';

export function useKeyDown(callback: () => void) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  return handleKeyDown;
}
