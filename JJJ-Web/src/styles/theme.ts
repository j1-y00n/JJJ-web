import { createTheme } from '@mui/material';
// : MUI 스타일 테마 설정

export const theme = createTheme({
  palette: {
    primary: {
      main: '#637a9f', // --color-blue
    },
    secondary: {
      main: '#c9d7dd', // --color-blue-light
    },
    error: {
      main: '#f00', // --color-red
    },
    warning: {
      main: '#ec952e', // --color-orange
    },
    background: {
      default: '#fff', // --color-white
      paper: '#000', // --color-black
    },
    text: {
      primary: '#000', // --color-black
      secondary: '#fff', // --color-white
    },
  },
  shape: {
    borderRadius: 10, // --border-radius
  },
  typography: {
    // fontFamily: '',
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
          '&.MuiButton-text': {
            color: 'var(--color-black)',
            backgroundColor: 'var(--color-blue-light)',
            padding: '10px 20px',
            '&:hover': {
              color: 'var(--color-white)',
              backgroundColor: 'var(--color-blue)',
            },
            '&:active': {
              color: 'var(--color-white)',
              backgroundColor: 'var(--color-blue)',
            },
          },
          '&.MuiButton-textInfo': {
            color: 'var(--color-black)',
            backgroundColor: 'var(--color-grey-light)',
            border: '1px solid var(--color-grey)',
            padding: '5px',
            '&:hover': {
              color: 'var(--color-black)',
              backgroundColor: 'var(--color-grey)',
              border: '1px solid var(--color-black)',
            },
            '&:active': {
              color: 'var(--color-black)',
              backgroundColor: 'var(--color-grey)',
              border: '1px solid var(--color-black)',
            },
          },
        },
      },
    },

    // MUI Icon Button 색상 커스터마이징
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.MuiIconButton-root': {
            color: 'var(--color-black)',
            backgroundColor: 'var(--color-grey-light)',
            borderRadius: '0',
            '&:hover': {
              color: 'var(--color-white)',
              backgroundColor: 'var(--color-grey)',
            },
            '&:active': {
              color: 'var(--color-white)',
              backgroundColor: 'var(--color-grey)',
            },
          },
          '&.MuiIconButton-colorInfo': {
            borderRadius: '50%',
          },
        },
      },
    },
  },
});
