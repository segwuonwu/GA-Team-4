import { AppBar, Toolbar, Button } from "@material-ui/core";
import Searchbar from "./Searchbar";
import Logo from "./Logo";

function LogNavBar() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Logo link="/" />
          <Searchbar />
          <Button>Profile</Button>
          <Button>Logout</Button>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default LogNavBar;

