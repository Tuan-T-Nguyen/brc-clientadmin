import {
  AUTHOR_GET_PAGING_LIST,
  AUTHOR_GET_PAGING_LIST_SUCCESS,
  AUTHOR_GET_PAGING_LIST_ERROR
} from '../actions';

const INIT_STATE = {
  pagingAuthors: [],
  pagingTotalAuthor: 0,
  pagingLoading: false,
  pagingError: false,
  searchKeyword: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTHOR_GET_PAGING_LIST:
      return {
        ...state,
        pagingLoading: true,
        searchKeyword: action.payload.searchKeyword
      };
    case AUTHOR_GET_PAGING_LIST_SUCCESS:
      return {
        ...state,
        pagingAuthors: action.payload.data,
        pagingTotalAuthor: action.payload.total,
        pagingLoading: false,
        pagingError: false
      };
    case AUTHOR_GET_PAGING_LIST_ERROR:
      return {
        ...state,
        pagingLoading: false,
        pagingError: true
      };
    default: {
      return { ...state };
    }
  }
};
