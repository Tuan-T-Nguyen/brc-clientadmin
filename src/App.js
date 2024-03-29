/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import main from './views';
import admin from './views/admin';
import user from './views/user';
import error from './views/error';

// eslint-disable-next-line no-shadow
const AuthRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/user/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    const { loginUser } = this.props;

    return (
      <div className="h-100">
        <>
          <NotificationContainer />
          <Router>
            <Switch>
              <AuthRoute path="/admin" authUser={loginUser} component={admin} />
              <Route path="/user" component={user} />
              <Route path="/error" exact component={error} />
              <Route path="/" exact component={main} />
              <Redirect to="/error" />
            </Switch>
          </Router>
        </>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser }) => {
  const { user: loginUser } = authUser;
  return { loginUser };
};
const mapActionsToProps = {};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
