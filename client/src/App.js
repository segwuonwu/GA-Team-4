import React from 'react';
import { useState, useEffect } from "react";
import jwtDecode from 'jwt-decode'
import { BrowserRouter as Router} from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PreAuthNav from "./Components/PreNavBar";
import PostAuthNav from "./Components/LogNavBar";
import Content from "./Components/Content";
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

function App(props) {
  // Declare state variables
  const [user, setUser] = useState(null)

  useEffect(() => {
    decodeToken()
  }, [])

  const updateUser = newToken => {
    if (newToken) {
      localStorage.setItem('mernToken', newToken)
      decodeToken(newToken);
    } else {
      setUser(null);
    }
  }

  const decodeToken = existingToken => {
    let token = existingToken || localStorage.getItem('mernToken');

    if (token) {
      let decoded = jwtDecode(token);
      // Check for expired token or non valid or user is not logged in at all
      if (!decoded || Date.now() >= decoded.exp * 1000) {
        console.log("Token expired!!")
        setUser(null);
      } else {
        setUser(decoded);
      }
    } else {
      setUser(null);
    }
  }

  function setNav() {
    return user ? <PostAuthNav updateUser={updateUser} user={user}/> : <PreAuthNav updateUser={updateUser} user={user}/>;
  }


  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          {setNav()}
          <Content updateUser={updateUser} user={user}/>
          <Footer/>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
