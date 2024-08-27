import { colors, createTheme } from '@mui/material';
// : MUI 스타일 테마 설정

export const theme = createTheme({
  palette: {
    primary: {
      main: '#637a9f', // --color-blue
    },
  },
  shape: {
    borderRadius: 10, // --border-radius
  },
  typography: {
    fontFamily: 'GmarketSansMedium',
    // fontSize: 14,
    // h1: {
    //   fontSize: 20,
    //   fontWeight: 500,
    // },
    // h2: {
    //   fontSize: '2rem',
    //   fontWeight: 400,
    // },
  },
  // MUI Radio button 색상 커스터마이징
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.MuiRadio-colorPrimary': {
            color: 'grey',
            '&.Mui-checked': {
              color: 'var(--color-blue)',
            },
          },
        },
      },
    },

    // MUI checkbox 색상 커스터마이징
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.MuiCheckbox-colorPrimary': {
            color: 'grey', // 체크박스 기본 색상
            '&.Mui-checked': {
              color: 'var(--color-blue)', // 체크박스 선택된 색상
            },
          },
          '&:hover': {
            backgroundColor: 'white',
          },
        },
      },
    },

    // MUI Tab 색상 커스터마이징
    MuiTab: {
      styleOverrides: {
        root: {
          '&.MuiTab-textColorPrimary': {
            color: 'grey', // 기본 탭 라벨 색상
            fontSize: '16px',
            '&.Mui-selected': {
              color: 'var(--color-blue)', // 선택된 탭 라벨 색상
              fontWeight: 'bold',
              fontSize: '16px',
            },
          },
        },
      },
    },

    // MUI Button 색상 커스터마이징
    MuiButton: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          color: 'var(--color-black)',
          padding: '10px 20px',
          '&:hover': {
            color: 'var(--color-white)',
          },
          '&.active': {
            color: 'var(--color-white)',
          },
          '&.MuiButton-text': {
            backgroundColor: 'var(--color-blue-light)',
            '&:hover': {
              backgroundColor: 'var(--color-blue)',
            },
            '&.active': {
              backgroundColor: 'var(--color-blue)',
            },
          },
          '&.MuiButton-colorSecondary': {
            backgroundColor: 'var(--color-grey-light)',
            '&:hover': {
              backgroundColor: 'var(--color-grey)',
            },
            '&.active': {
              backgroundColor: 'var(--color-grey)',
            },
          },
          '&.MuiButton-textInfo': {
            backgroundColor: 'var(--color-grey-light)',
            border: '1px solid var(--color-grey)',
            padding: '5px',
            '&:hover': {
              backgroundColor: 'var(--color-grey)',
              border: '1px solid var(--color-black)',
              color: 'var(--color-black)',
            },
            '&.active': {
              backgroundColor: 'var(--color-grey)',
              border: '1px solid var(--color-black)',
              color: 'var(--color-black)',
            },
          },
        },
      },
    },

    // MUI Icon Button 색상 커스터마이징
    MuiIconButton: {
      styleOverrides: {
        root: {
          whiteSpace: 'nowrap',
          color: 'var(--color-black)',
          backgroundColor: 'var(--color-grey-light)',
          borderRadius: '0',
          '&:hover': {
            color: 'var(--color-white)',
            backgroundColor: 'var(--color-grey)',
          },
          '&.active': {
            color: 'var(--color-white)',
            backgroundColor: 'var(--color-grey)',
          },
          '&.round': {
            borderRadius: '50%',
          },
          '&.nest__icons': {
            '& .MuiSvgIcon-root': {
              '&.font__large': {
                fontSize: '30px',
              },
              '&.font__medium': {
                fontSize: '20px',
              },
              '&.default': {
                position: 'absolute',
                visibility: 'visible',
              },
              '&.show': {
                visibility: 'hidden',
              },
              '&.active': {
                visibility: 'visible',
                color: 'var(--color-black)',
              },
            },
            '&:hover .default': {
              visibility: 'hidden',
            },
            '&:hover .show': {
              visibility: 'visible',
            },
          },
          '&.MuiIconButton-colorSecondary': {
            backgroundColor: 'var(--color-white)',
            '&:hover': {
              color: 'var(--color-white)',
              backgroundColor: 'var(--color-blue)',
            },
          },
        },
      },
    },

    // MUI TextField 색상 커스터마이징
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--color-grey)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--color-blue)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--color-blue)',
            },
          },
        },
      },
    },
  },
});
