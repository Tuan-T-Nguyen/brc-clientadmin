import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AUTHOR_GET_PAGING_LIST } from '../actions';

import {
  getAuthorPagingListSuccess,
  getAuthorPagingListError
} from './actions';
import { apiGetPagingAuthorList } from '../../services/author';

function* getPagingAuthorList({ payload }) {
  try {
    const response = yield call(
      apiGetPagingAuthorList,
      payload.page,
      payload.searchKeyword
    );
    if (response.status) {
      yield put(getAuthorPagingListSuccess(response.data));
    } else {
      yield put(getAuthorPagingListError({ msg: response.msg }));
    }
  } catch (error) {
    yield put(getAuthorPagingListError({ msg: 'Connect to server error' }));
  }
}

export function* watchPagingAuthorList() {
  yield takeEvery(AUTHOR_GET_PAGING_LIST, getPagingAuthorList);
}

export default function* rootSaga() {
  yield all([fork(watchPagingAuthorList)]);
}
