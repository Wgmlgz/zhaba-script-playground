import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    paper: {
      main: "#c678dd",
    },
    primary: {
      main: "#c678dd",
    },
    secondary: {
      main: "#98c379",
    },
    text: {
      primary: "#ffffff",
      secondary: "#282c34",
    },
    background: {
      default: "#282c34",
      paper: "#282c34",
    },
    error: {
      main: "#e06c75",
    },
    warning: {
      main: "#e5c07b",
    },
    info: {
      main: "#61afef",
    },
    success: {
      main: "#98c379",
    },
  },
  typography: {
    fontFamily: "JetBrains Mono",
    fontSize: 16,
  },
  shape: {
    borderRadius: 20,
  },
});

export default theme;