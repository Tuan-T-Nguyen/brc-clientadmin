import {
  AUTHOR_GET_PAGING_LIST,
  AUTHOR_GET_PAGING_LIST_SUCCESS,
  AUTHOR_GET_PAGING_LIST_ERROR
} from '../actions';

export const getAuthorPagingList = (page, searchKeyword) => ({
  type: AUTHOR_GET_PAGING_LIST,
  payload: { page, searchKeyword }
});

export const getAuthorPagingListSuccess = authors => ({
  type: AUTHOR_GET_PAGING_LIST_SUCCESS,
  payload: authors
});

export const getAuthorPagingListError = error => ({
  type: AUTHOR_GET_PAGING_LIST_ERROR,
  payload: error
});
