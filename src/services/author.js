import Network from '../helpers/Network';
import { PAGE_LIMIT } from '../constants/defaultValues';

export const apiGetPagingAuthorList = async (page, searchKeyword) => {
  const url = searchKeyword
    ? `authors/list-paging?page=${page}&perPage=${PAGE_LIMIT}&search=${searchKeyword}`
    : `authors/list-paging?page=${page}&perPage=${PAGE_LIMIT}`;
  const response = await Network.requestGet(url, true);
  if (response.statusCode === 200) {
    if (!response.body.message) {
      return {
        status: true,
        msg: '',
        data: response.body
      };
    }
    return {
      status: false,
      msg: response.body.message
    };
  }
  return {
    status: false,
    msg: response.body.message
  };
};

export const apiGetAuthorList = async () => {};

export const apiCreateAuthor = async values => {
  const { name, description, avatarUrls, bornDate, dieDate } = values;
  const response = await Network.requestPost(
    'authors',
    { name, description, avatarUrls, bornDate, dieDate },
    true
  );
  if (response.statusCode === 200) {
    if (!response.body.message) {
      return {
        status: true,
        msg: '',
        data: response.body
      };
    }
    return {
      status: false,
      msg: response.body.message
    };
  }
  return {
    status: false,
    msg: response.body.message
  };
};
