import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from '../actions';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});
export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: { user }
});
export const loginUserError = () => ({
  type: LOGIN_USER_ERROR,
  payload: {}
});

export const logoutUser = history => ({
  type: LOGOUT_USER,
  payload: { history }
});
