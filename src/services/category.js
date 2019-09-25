/* eslint-disable import/prefer-default-export */
import Network from '../helpers/Network';

export const apiGetCategoryList = async () => {
  const response = await Network.requestGet('categories', true);
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
  return response;
};
