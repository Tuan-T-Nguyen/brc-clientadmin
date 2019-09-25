const LocalStorageService = (() => {
  let _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    localStorage.setItem('accessToken', tokenObj.accessToken);
    localStorage.setItem('refreshToken', tokenObj.refreshToken);
  }

  function _setUser(user) {
    localStorage.setItem('email', user.email);
  }

  function _getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  function _getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  function _getUserEmail() {
    localStorage.getItem('email');
  }

  function _clearToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
  }
  return {
    getService: _getService,
    setToken: _setToken,
    setUser: _setUser,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    getUserEmail: _getUserEmail,
    clearToken: _clearToken
  };
})();
export default LocalStorageService;
