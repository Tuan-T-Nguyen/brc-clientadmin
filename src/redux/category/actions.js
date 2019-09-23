import {
  CATEGORY_AUTO_GENERATE,
  CATEGORY_GET_LIST,
  CATEGORY_GET_LIST_SUCCESS,
  CATEGORY_GET_LIST_ERROR,
  CATEGORY_SELECTED_ITEMS_CHANGE
} from '../actions';

export const getCategoryList = () => ({
  type: CATEGORY_GET_LIST,
  payload: {}
});

export const getCategoryListSuccess = categories => ({
  type: CATEGORY_GET_LIST_SUCCESS,
  payload: { categories }
});

export const getCategoryListError = error => ({
  type: CATEGORY_GET_LIST_ERROR,
  payload: { error }
});

export const categoryAutoGenerate = () => ({
  type: CATEGORY_AUTO_GENERATE,
  payload: {}
});

export const selectedCategoryItemsChange = selectedItems => ({
  type: CATEGORY_SELECTED_ITEMS_CHANGE,
  payload: selectedItems
});
