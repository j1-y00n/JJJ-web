import { Box, Button } from '@mui/material';
import { theme } from '../styles/theme';
import { useFilterStore } from '../stores/useFilter.store';
import { CategoryAgeType } from '../types/TempMockdata';

export default function Filter() {
  const ages: CategoryAgeType[] = [
    '모두 보기',
    '0-6',
    '7-12',
    '12-18',
    '19-24',
    '2-3',
  ];

  const sorting: string[] = [
    '최신순',
    '가격높은순',
    '가격낮은순',
    '별점순',
    '리뷰많은순',
  ];

  const { activeAge, activeSorting, setActiveAge, setActiveSorting } =
    useFilterStore();

  const handleAgeClick = (age: CategoryAgeType) => {
    setActiveAge(age === activeAge ? '모두 보기' : age);
  };
  const handleFilterClick = (filter: string) => {
    setActiveSorting(activeSorting === filter ? null : filter);
  };

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
            key={item}
            sx={{
              padding: '10px 20px',
              marginRight: '20px',
              backgroundColor:
                activeAge === item ? 'secondary.main' : 'primary.main',
              color: activeAge === item ? 'primary.main' : 'text.secondary',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'primary.main',
              },
              outline:
                activeAge === item
                  ? `2px solid ${theme.palette.primary.main}`
                  : 'none',
            }}
            onClick={() => handleAgeClick(item)}
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
        {sorting.map((item) => (
          <Button
            key={item}
            sx={{
              padding: '10px 20px',
              marginRight: '20px',
              backgroundColor:
                activeSorting === item ? 'secondary.main' : 'primary.main',
              color: activeSorting === item ? 'primary.main' : 'text.secondary',
              '&:hover': {
                backgroundColor: 'secondary.main',
                color: 'primary.main',
              },
              outline:
                activeSorting === item
                  ? `2px solid ${theme.palette.primary.main}`
                  : 'none',
            }}
            onClick={() => handleFilterClick(item)}
          >
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
