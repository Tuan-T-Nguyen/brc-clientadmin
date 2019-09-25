import axios from 'axios';
import { END_POINT } from '../constants/defaultValues';
import LocalStorageService from './LocalStorageService';
// LocalstorageService
const localStorageService = LocalStorageService.getService();

class Network {
  static requestPost(url, params, bearerToken = null) {
    return Network.requestHttp('POST', url, params, bearerToken);
  }

  static requestGet(url, bearerToken = null) {
    return Network.requestHttp('GET', url, null, bearerToken);
  }

  static requestPut(url, params, bearerToken = null) {
    return Network.requestHttp('PUT', url, params, bearerToken);
  }

  static requestPatch(url, params, bearerToken = null) {
    return Network.requestHttp('PATCH', url, params, bearerToken);
  }

  static requestDelete(url, params, bearerToken = null) {
    return Network.requestHttp('DELETE', url, params, bearerToken);
  }

  static requestPostWithFile(url, formData, bearerToken = null) {
    return Network.requestHttpWithFile('POST', url, formData, bearerToken);
  }

  static requestPutWithFile(url, formData, bearerToken = null) {
    return Network.requestHttpWithFile('PUT', url, formData, bearerToken);
  }

  static async requestHttp(method, uri, params, bearerToken) {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      Pragma: 'no-cache'
    };
    try {
      // Source: https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
      // Add a request interceptor
      axios.interceptors.request.use(
        config => {
          const token = localStorage.getItem('accessToken');
          if (token && bearerToken !== null) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        error => {
          Promise.reject(error);
        }
      );
      // Add a response interceptor
      axios.interceptors.response.use(
        response => {
          return response;
        },
        async error => {
          const originalRequest = error.config;

          if (
            error.response.status === 401 &&
            originalRequest.url === `${END_POINT}/auth/refresh-token`
          ) {
            localStorageService.clearToken();
            window.location.reload();
            return Promise.reject(error);
          }

          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            const email = localStorage.getItem('email');
            return axios
              .post(`${END_POINT}/auth/refresh-token`, {
                email,
                refreshToken
              })
              .then(res => {
                if (res.status === 200) {
                  localStorageService.setToken(res.data);
                  axios.defaults.headers.common.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
                  return axios(originalRequest);
                }
                return axios(originalRequest);
              });
          }
          return Promise.reject(error);
        }
      );

      const response = await axios({
        method,
        url: `${END_POINT}/${uri}`,
        data: JSON.stringify(params),
        headers,
        auth: bearerToken
          ? null
          : {
              username: 'tuannguyen',
              password: '$apr1$HV30SyiB$mTBfePeAKX4ou85ed9GKB1'
            }
      });
      return {
        statusCode: response.status,
        body: response.data
      };
    } catch (error) {
      let errorMsg = '';
      if (error.response) {
        return {
          statusCode: error.response.status,
          body: error.response.data
        };
      }
      if (error.request) {
        errorMsg = error.request;
      } else {
        errorMsg = error.message;
      }
      return {
        statusCode: 500,
        body: { message: errorMsg }
      };
    }
  }

  static async requestHttpWithFile(method, uri, formData, bearerToken) {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      Pragma: 'no-cache'
    };
    if (bearerToken) {
      headers.Authorization = `Bearer ${bearerToken}`;
    }
    try {
      const response = await axios({
        method,
        url: `${END_POINT}/${uri}`,
        data: formData,
        headers
      });
      return {
        statusCode: response.status,
        body: response.data
      };
    } catch (error) {
      let errorMsg = '';
      if (error.response) {
        return {
          statusCode: error.response.status,
          body: error.response.data
        };
      }
      if (error.request) {
        errorMsg = error.request;
      } else {
        errorMsg = error.message;
      }
      return {
        statusCode: 500,
        body: { message: errorMsg }
      };
    }
  }
}

export default Network;
