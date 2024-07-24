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
});
