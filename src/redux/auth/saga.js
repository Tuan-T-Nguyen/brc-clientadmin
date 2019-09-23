import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_USER } from '../actions';

import { loginUserSuccess, loginUserError } from './actions';
import { apiAdminLogin } from '../../services/auth';

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const response = yield call(apiAdminLogin, email, password);
    console.log(response);
    if (response.status) {
      localStorage.setItem('token', JSON.stringify(response.data.token));
      yield put(loginUserSuccess(response.data.user));
      history.push('/');
    } else {
      yield put(loginUserError());
    }
  } catch (error) {
    console.log(error);
    yield put(loginUserError());
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser)]);
}
