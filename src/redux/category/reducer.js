import {
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_SUCCESS,
  CATEGORY_GET_LIST_ERROR,
  CATEGORY_SELECTED_ITEMS_CHANGE
} from '../actions';

const INIT_STATE = {
  categories: [],
  loading: false,
  errorGetList: false,
  selectedItems: [],
  orderColumn: null,
  searchKeyword: '',
  labels: [
    { label: 'EDUCATION', color: 'secondary' },
    { label: 'NEW FRAMEWORK', color: 'primary' },
    { label: 'PERSONAL', color: 'info' }
  ],
  orderColumns: [
    { column: 'title', label: 'Title' },
    { column: 'category', label: 'Category' },
    { column: 'status', label: 'Status' },
    { column: 'label', label: 'Label' }
  ]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CATEGORY_GET_LIST:
      return {
        ...state,
        loading: true
      };
    case CATEGORY_GET_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload
      };
    case CATEGORY_GET_LIST_ERROR:
      return {
        ...state,
        loading: false,
        errorGetList: true
      };
    case CATEGORY_SELECTED_ITEMS_CHANGE:
      return {
        ...state,
        loading: true,
        selectedItems: action.payload
      };
    default:
      return { ...state };
  }
};
