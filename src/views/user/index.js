import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';

import login from './login';

const User = ({ match }) => {
  return (
    <UserLayout>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
        <Route path={`${match.url}/login`} component={login} />
        <Redirect to="/error" />
      </Switch>
    </UserLayout>
  );
};

export default User;
