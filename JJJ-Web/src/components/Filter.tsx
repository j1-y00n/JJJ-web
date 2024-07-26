import { Box, Button } from '@mui/material';
import React from 'react';
import { theme } from '../styles/theme';

export default function Filter() {
  const ages: string[] = [
    '모두 보기',
    '0-6개월',
    '7-12개월',
    '12-18개월',
    '19-24개월',
    '2-3세',
  ];

  const filtering: string[] = [
    '가격높은순',
    '가격낮은순',
    '판매량순',
    '최신순',
    '리뷰순',
  ];
  return (
    <Box
      sx={{
        width: '1200px',
        marginLeft: '10px',
        borderTop: `1px solid ${theme.palette.secondary.main}`,
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Box
        className='ages__box'
        sx={{ display: 'flex', alignItems: 'center', height: '80px' }}
      >
        {ages.map((item) => (
          <Button
            sx={{
              marginRight: '10px',
              backgroundColor: 'primary.main',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'primary.main',
              },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '80px',
          borderTop: `1px solid ${theme.palette.secondary.main}`,
        }}
        className='filters__box'
      >
        {filtering.map((item) => (
          <Button
            sx={{
              marginRight: '10px',
              backgroundColor: 'primary.main',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'primary.main',
              },
            }}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
