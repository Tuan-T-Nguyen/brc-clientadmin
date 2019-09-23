import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CategoryList from './list';

const Category = ({ match }) => {
  return (
    <div className="dashboard-wrapper">
      <Switch>
        <Route exact path={`${match.url}`} component={CategoryList} />
        <Redirect to="/error" />
      </Switch>
    </div>
  );
};

export default Category;
