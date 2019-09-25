import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER
} from '../actions';

const INIT_STATE = {
  user: localStorage.getItem('accessToken'),
  loading: false,
  error: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: false };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return { ...state };
  }
};
