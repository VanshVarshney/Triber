import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';

// (Material-UI) MUI Stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Icons

import HomeIcon from '@material-ui/icons/Home';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';

class Navbar extends Component {
  // Logout Funcationality
  handleLogout = () => {
    this.props.logoutUser();
  };

  // AC

  render() {
    const { authenticated } = this.props;

    return (
      <AppBar>
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <div className="nav-container-3">
                <PostScream />

                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon />
                  </MyButton>
                </Link>

                <Notifications />
              </div>
              <Tooltip title="Logout" placement="top">
                <IconButton onClick={this.handleLogout}>
                  <KeyboardReturn color="primary" />
                </IconButton>
              </Tooltip>
            </Fragment>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
