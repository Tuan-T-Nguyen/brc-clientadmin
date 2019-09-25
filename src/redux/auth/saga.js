import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { LOGIN_USER } from '../actions';

import { loginUserSuccess, loginUserError } from './actions';
import { apiAdminLogin } from '../../services/auth';
import LocalStorageService from '../../helpers/LocalStorageService';

const localStorageService = LocalStorageService.getService();

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const response = yield call(apiAdminLogin, email, password);
    if (response.status) {
      localStorageService.setToken(response.data.token);
      localStorageService.setUser(response.data.user);
      yield put(loginUserSuccess(response.data.user));
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
