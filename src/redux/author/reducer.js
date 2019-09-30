import {
  AUTHOR_GET_PAGING_LIST,
  AUTHOR_GET_PAGING_LIST_SUCCESS,
  AUTHOR_GET_PAGING_LIST_ERROR
} from '../actions';

const INIT_STATE = {
  pagingAuthors: [],
  pagingLoading: false,
  pagingError: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case AUTHOR_GET_PAGING_LIST:
      return {
        ...state,
        pagingLoading: true
      };
    case AUTHOR_GET_PAGING_LIST_SUCCESS:
      return {
        ...state,
        pagingAuthors: action.payload,
        pagingLoading: false,
        pagingError: false
      };
    default: {
      return { ...state };
    }
  }
};
