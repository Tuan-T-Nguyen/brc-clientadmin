import Network from '../helpers/Network';

export const isSignIned = () => {
  const token = localStorage.getItem('token');
  return token && token.length > 0;
};

export const apiAdminLogin = async (email, password) => {
  const response = await Network.requestPost('auth/admin-login', {
    email,
    password,
    role: 'admin'
  });
  return response;
};
