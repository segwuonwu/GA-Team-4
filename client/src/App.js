import React from 'react';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import './scss/App.scss';
import Logo from "./Components/Logo";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#EFF7E7",
      main: "#9CCC65",
      dark: "#6B9B37"
    },
    secondary: {
      light: "#B2FEF7",
      main: "#80CBC4",
      dark: "#4F9A94"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Logo link="/" />
    </div>
    </ThemeProvider>
  );
}

export default App;
