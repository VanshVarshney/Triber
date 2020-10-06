import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// (Material-UI) MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          <div className="nav-container-1">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </div>
          <div className="nav-container-2">
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
