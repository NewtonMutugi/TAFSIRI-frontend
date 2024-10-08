import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#ffffff',
        paper: mode === 'dark' ? '#1d1d1d' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
      },
      divider: '#bbbfd0',
    },
    customShadows: {
      z1: '0px 1px 3px rgba(0, 0, 0, 0.2)',
      // other shadow definitions
    },
  });
