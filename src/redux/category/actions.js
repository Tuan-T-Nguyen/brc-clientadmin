import {
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_SUCCESS,
  CATEGORY_GET_LIST_ERROR,
  CATEGORY_SELECTED_ITEMS_CHANGE,
  CATEGORY_GET_LIST_WITH_FILTER,
  CATEGORY_GET_LIST_WITH_ORDER,
  CATEGORY_GET_LIST_SEARCH
} from '../actions';

export const getCategoryList = () => ({
  type: CATEGORY_GET_LIST,
  payload: {}
});

export const getCategoryListSuccess = categories => ({
  type: CATEGORY_GET_LIST_SUCCESS,
  payload: categories
});

export const getCategoryListError = error => ({
  type: CATEGORY_GET_LIST_ERROR,
  payload: { error }
});

export const selectedCategoryItemsChange = selectedItems => ({
  type: CATEGORY_SELECTED_ITEMS_CHANGE,
  payload: selectedItems
});

export const getCategoryListWithFilter = (column, value) => ({
  type: CATEGORY_GET_LIST_WITH_FILTER,
  payload: { column, value }
});

export const getCategoryListWithOrder = column => ({
  type: CATEGORY_GET_LIST_WITH_ORDER,
  payload: column
});

export const getCategoryListSearch = keyword => ({
  type: CATEGORY_GET_LIST_SEARCH,
  payload: keyword
});
