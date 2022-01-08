import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#c678dd',
    },
    secondary: {
      main: '#98c379',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ABB2BF',
    },
    background: {
      default: '#082c34',
      paper: '#282c34',
    },
    error: {
      main: '#e06c75',
    },
    warning: {
      main: '#e5c07b',
    },
    info: {
      main: '#61afef',
    },
    success: {
      main: '#98c379',
    },
  },
  typography: {
    fontFamily: 'JetBrains Mono',
    fontSize: 16,
  },
  shape: {
    borderRadius: 20,
  },
})

export default theme
