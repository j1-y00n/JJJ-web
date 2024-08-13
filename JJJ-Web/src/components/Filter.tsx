import { Box, Button } from '@mui/material';
import { theme } from '../styles/theme';
import { useFilterStore } from '../stores/Filter.store';
import { CategoryAgeType } from '../types/TempMockdata';

interface AgeOption {
  value: CategoryAgeType;
  label: string;
}

export default function Filter() {
  const ages: AgeOption[] = [
    { value: '모두 보기', label: '모두 보기' },
    { value: '0-6', label: '0-6개월' },
    { value: '7-12', label: '7-12개월' },
    { value: '12-18', label: '12-18개월' },
    { value: '19-24', label: '19-24개월' },
    { value: '2-3', label: '2-3세' },
    { value: 'over3', label: '3세 이상' },
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
        width: 'var(--max-width)',
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
            key={item.value}
            sx={{
              marginRight: '20px',
            }}
            onClick={() => handleAgeClick(item.value)}
          >
            {item.label}
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
              marginRight: '20px',
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
