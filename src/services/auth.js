import Network from '../helpers/Network';

export const isSignIned = () => {
  const token = localStorage.getItem('token');
  return token && token.length > 0;
};

export const storeToken = token => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const clearToken = () => {
  localStorage.removeItem('token');
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
