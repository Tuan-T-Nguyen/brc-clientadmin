import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ColorSwitcher from './components/common/ColorSwitcher';
import NotificationContainer from './components/common/react-notifications/NotificationContainer';
import { isMultiColorActive } from './constants/defaultValues';
import main from './views';
import app from './views/app';
import user from './views/user';
import error from './views/error';

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
        <React.Fragment>
          <NotificationContainer />
          {isMultiColorActive && <ColorSwitcher />}
          <Router>
            <Switch>
              <AuthRoute path="/app" authUser={loginUser} component={app} />
              <Route path="/user" component={user} />
              <Route path="/error" exact component={error} />
              <Route path="/" exact component={main} />
              <Redirect to="/error" />
            </Switch>
          </Router>
        </React.Fragment>
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
