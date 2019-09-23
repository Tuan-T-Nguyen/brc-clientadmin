import { combineReducers } from 'redux';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import categoryRedux from './category/reducer';

const reducers = combineReducers({
  menu,
  authUser,
  categoryRedux
});

export default reducers;
