import { combineReducers } from 'redux';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import categoryRedux from './category/reducer';
import authorRedux from './author/reducer';

const reducers = combineReducers({
  menu,
  authUser,
  categoryRedux,
  authorRedux
});

export default reducers;
