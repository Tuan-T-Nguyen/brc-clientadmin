import Network from '../helpers/Network';

export const isSignIned = () => {
  const token = localStorage.getItem('accessToken');
  return token && token.length > 0;
};

export const apiAdminLogin = async (email, password) => {
  const response = await Network.requestPost('auth/admin-login', {
    email,
    password,
    role: 'admin'
  });
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
