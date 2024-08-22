import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import { Padding, WidthFull } from '@mui/icons-material';

export default function FloatingActionButtons() {
  const [isShow, setIsShow] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    console.log(document.documentElement.scrollHeight);
  };

  const fabIconStyles = {
    borderRadius: '50%',
    height: '40px',
    width: '20px',
    margin: '5px',
    backgroundColor: 'var(--color-blue-light)',
    '&:hover': {
      color: 'var(--color-white)',
      backgroundColor: 'var(--color-blue)',
    },
  };

  return (
    <Box
      sx={{
        zIndex: '100',
        position: 'fixed',
        right: '200px',
        bottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        opacity: isShow ? '100' : '0',
        cursor: isShow ? 'pointer' : 'none',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Fab variant='extended' sx={fabIconStyles} onClick={handleScrollUp}>
        <ArrowDropUpIcon />
      </Fab>
      <Fab variant='extended' sx={fabIconStyles} onClick={handleScrollDown}>
        <ArrowDropDownIcon />
      </Fab>
    </Box>
  );
}
