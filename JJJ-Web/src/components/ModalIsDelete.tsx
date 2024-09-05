import { Modal, Box, Button, Typography } from '@mui/material';

interface ModalIsDeleteProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleDeleteContent?: () => void;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 'var(--border-radius)',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export default function ModalIsDelete({
  isOpen,
  handleCloseModal,
  handleDeleteContent,
}: ModalIsDeleteProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleCloseModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box component='form' noValidate autoComplete='off' sx={modalStyle}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          정말로 삭제하시겠습니까?
        </Typography>
        <Typography
          id='modal-modal-description'
          sx={{ my: 2, color: 'var(--color-red)' }}
        >
          삭제 후 되돌릴 수 없습니다
        </Typography>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button 
            onClick={() => {
              if (handleDeleteContent) {
                handleDeleteContent();
                handleCloseModal();
              }
            }} 
            sx={{ marginRight: '20px' }}
          >
            삭제
          </Button>
          <Button onClick={handleCloseModal}>취소</Button>
        </Box>
      </Box>
    </Modal>
  );
}
