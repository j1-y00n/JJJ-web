import { useState } from 'react';

export function useOpenModal() {
  const [isOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return { isOpen, handleOpenModal, handleCloseModal };
}
