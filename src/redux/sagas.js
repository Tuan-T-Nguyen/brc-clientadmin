import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import categorySagas from './category/saga';
import authorSagas from './author/saga';

export default function* rootSaga() {
  yield all([authSagas(), categorySagas(), authorSagas()]);
}
