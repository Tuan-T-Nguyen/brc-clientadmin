import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthorList from './list';

const Author = ({ match }) => {
  return (
    <div className="dashboard-wrapper">
      <Switch>
        <Route exact path={`${match.url}`} component={AuthorList} />
        <Redirect to="/error" />
      </Switch>
    </div>
  );
};

export default Author;
