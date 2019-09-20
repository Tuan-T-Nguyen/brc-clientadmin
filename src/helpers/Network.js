import axios from 'axios';
import { END_POINT } from '../constants/defaultValues';

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
    if (bearerToken) {
      headers.Authorization = `Bearer ${bearerToken}`;
    }
    try {
      const response = await axios({
        method,
        url: END_POINT + uri,
        data: JSON.stringify(params),
        headers
      });
      return {
        statusCode: response.status,
        body: response.data
      };
    } catch (error) {
      let errorMsg = '';
      if (error.response) {
        // if (error.response.status === 401) {
        //   localStorage.clear();
        //   window.location.reload();
        // }
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
        url: END_POINT + uri,
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
        // if (error.response.status === 401) {
        //   localStorage.clear();
        //   window.location.reload();
        // }
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
