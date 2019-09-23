import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import categorySagas from './category/saga';

export default function* rootSaga() {
  yield all([authSagas(), categorySagas()]);
}
