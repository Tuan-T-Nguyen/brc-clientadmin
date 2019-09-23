import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { CATEGORY_GET_LIST } from '../actions';

import { getCategoryListSuccess, getCategoryListError } from './actions';
import { apiGetCategoryList } from '../../services/category';

function* getCategoryList() {
  try {
    const response = yield call(apiGetCategoryList);
    if (response.status) {
      yield put(getCategoryListSuccess(response));
    } else {
      yield put(
        getCategoryListError({
          msg: response.msg
        })
      );
    }
  } catch (error) {
    yield put(getCategoryListError({ msg: 'Connect to server error' }));
  }
}

export function* watchCategoryList() {
  yield takeEvery(CATEGORY_GET_LIST, getCategoryList);
}

export default function* rootSaga() {
  yield all([fork(watchCategoryList)]);
}
