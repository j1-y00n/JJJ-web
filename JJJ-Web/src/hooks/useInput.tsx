import React, { useState } from 'react';

export function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    handleInputChange,
    reset,
  };
}
