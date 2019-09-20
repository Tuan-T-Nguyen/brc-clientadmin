import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_USER } from '../actions';

import { loginUserSuccess, loginUserError } from './actions';
import { apiAdminLogin } from '../../services/auth';

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const response = yield call(apiAdminLogin, email, password);
    if (response.statusCode === 200) {
      localStorage.setItem('token', response.body.token.accessToken);
      yield put(loginUserSuccess(response.body.user));
      history.push('/');
    } else {
      yield put(loginUserError());
    }
  } catch (error) {
    yield put(loginUserError());
  }
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser)]);
}
