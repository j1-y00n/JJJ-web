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
              color: '#637a9f',
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
              color: '#637a9f', // 체크박스 선택된 색상
            }
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
              color: '#637a9f', // 선택된 탭 라벨 색상
              fontWeight: 'bold',
              fontSize: '16px',
            },
          },
        },
      },
    },
  },
});
