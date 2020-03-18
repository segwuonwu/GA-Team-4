import React from 'react';
import { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PreAuthNav from "./Components/PreNavBar";
import PostAuthNav from "./Components/LogNavBar";
import Footer from "./Components/Footer";
import "./scss/App.scss";

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
  const [authStatus, setAuthStatus] = useState(false);
  function setNav() {
    return authStatus ? <PostAuthNav /> : <PreAuthNav />;
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        {setNav()}
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
