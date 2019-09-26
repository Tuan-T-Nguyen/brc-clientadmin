import {
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_SUCCESS,
  CATEGORY_GET_LIST_ERROR,
  CATEGORY_SELECTED_ITEMS_CHANGE,
  CATEGORY_GET_LIST_WITH_FILTER,
  CATEGORY_GET_LIST_WITH_ORDER
} from '../actions';

const INIT_STATE = {
  categories: [],
  reduceCategories: [],
  loading: false,
  errorGetList: false,
  selectedItems: [],
  orderColumn: null,
  filter: null,
  searchKeyword: '',
  labels: [
    { label: 'all', color: 'info' },
    { label: 'fiction', color: 'primary' },
    { label: 'non-fiction', color: 'secondary' }
  ],
  orderColumns: [
    { column: 'englishName', label: 'English Name' },
    { column: 'vietnamName', label: 'Vietnam Name' },
    { column: 'createdAt', label: 'Created At' },
    { column: 'updatedAt', label: 'Updated At' }
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
        categories: action.payload,
        reduceCategories: action.payload,
        filter: null,
        searchKeyword: '',
        selectedItems: [],
        orderColumn: null
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
    case CATEGORY_GET_LIST_WITH_FILTER: {
      if (
        action.payload.column === '' ||
        action.payload.value === '' ||
        action.payload.value === 'all'
      ) {
        return {
          ...state,
          // loading: true,
          reduceCategories: state.categories,
          filter:
            action.payload.value === 'all'
              ? {
                  column: action.payload.column,
                  value: action.payload.value
                }
              : null
        };
      }
      const filteredItems = state.categories.filter(item => {
        return item[action.payload.column] === action.payload.value;
      });
      return {
        ...state,
        // loading: true,
        reduceCategories: filteredItems,
        filter: {
          column: action.payload.column,
          value: action.payload.value
        }
      };
    }
    case CATEGORY_GET_LIST_WITH_ORDER: {
      if (action.payload === '') {
        return {
          ...state,
          reduceCategories: state.reduceCategories,
          orderColumn: null
        };
      }
      const sortedItems = state.reduceCategories.sort((a, b) => {
        if (a[action.payload] < b[action.payload]) return -1;
        if (a[action.payload] > b[action.payload]) return 1;
        return 0;
      });
      return {
        ...state,
        reduceCategories: sortedItems,
        orderColumn: state.orderColumns.find(x => x.column === action.payload)
      };
    }
    default:
      return { ...state };
  }
};
