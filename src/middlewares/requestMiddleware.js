export default function requestMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const { request } = action;

    if (!request) {
      return next(action);
    }

    const token = localStorage.getItem('token');

    // 5 minutes from now
    const refreshThreshold = new Date.getTime() + 300000;

    if (token.refreshToken && refreshThreshold > token.expiresIn) {
      return superagent
        .post('/path/to/renew')
        .send({ refresh_token: tokens.refresh_token })
        .end((err, { body } = {}) => {
          dispatch({ type: 'SET_TOKENS', payload: body });
          request(body);
        });
    }
    return request(tokens);
  };
}
