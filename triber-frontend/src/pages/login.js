import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/user.svg';
import { Link } from 'react-router-dom';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = {
  typography: {
    useNextVariants: true,
  },
  form: {
    textAlign: 'center',
  },
  image: {
    width: '50px',
    margin: '20px auto 20px 70px',
  },
  pageTitle: {
    margin: '20px auto 20px auto',
  },
  textField: {
    // width: '250px',
    margin: '10px auto 10px auto',
    // height: 200,
  },
  button: {
    margin: '20px auto 20px auto',
    padding: '10px 50px 10px 50px',
    // marginLeft: '25px',
    position: 'relative',
  },
  button2: {
    margin: '20px auto 20px auto',
    padding: '10px 50px 10px 50px',
    marginLeft: '25px',
    position: 'relative',
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 15,
    marginBottom: 5,
  },
  progress: {
    position: 'absolute',
  },
  footerPro: {
    margin: '20px auto 0px auto',
    // position: 'absolute',
    width: '80%',
    bottom: 10,
  },
};

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  //

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  // ********************************************************
  // Handlers
  handleSubmit = (Event) => {
    Event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (Event) => {
    this.setState({
      [Event.target.name]: Event.target.value,
    });
  };
  // ********************************************************

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors, reset } = this.state;

    return (
      <Grid comtainer className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="Triber Logo" className={classes.image} />
          TRIBER
          <br />
          <Typography variant="h3" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              {' '}
              LOGIN{' '}
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <Button
              onClick={reset}
              variant="contained"
              color="primary"
              className={classes.button2}
            >
              {' '}
              Reset{' '}
            </Button>
            <br />

            <small>
              {' '}
              Don't have an Account ? <Link to="/signup">SignUp</Link> here{' '}
            </small>
            <br />
            <div className={classes.footerPro}>
              <hr />

              <small fullWidth>
                Made With{' '}
                <span role="img" aria-label="Love">
                  ❤️
                </span>{' '}
                By Team Triber
              </small>
            </div>
            <br />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
