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
  return {
    status: false,
    msg: response.body.message
  };
};

export const apiCreateCategory = async values => {
  const { englishName, vietnamName, type } = values;
  const response = await Network.requestPost(
    'categories',
    {
      englishName,
      vietnamName,
      type
    },
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

export const apiUpdateCategory = async (id, values) => {
  const { englishName, vietnamName, type } = values;
  const response = await Network.requestPatch(
    `categories/${id}`,
    {
      englishName,
      vietnamName,
      type
    },
    true
  );
  console.log(JSON.stringify(response));

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
