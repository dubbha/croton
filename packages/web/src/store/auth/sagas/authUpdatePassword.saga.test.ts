import { expectSaga } from 'redux-saga-test-plan';
import { http } from 'services'
import { AUTH_UPDATE_PASSWORD, AUTH_UPDATE_PASSWORD_SUCCESS, AUTH_UPDATE_PASSWORD_ERROR } from '../actions';
import { authUpdatePasswordSaga } from './authUpdatePassword.saga';

jest.mock('services', () => ({
  http: {
    post: jest.fn()
  }
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('authUpdatePassword', () => {
  it('should call api', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.resolve({})
    );

    return expectSaga(authUpdatePasswordSaga)
      .call(http.post, '/auth/password-update', {
        passwordResetToken: 'TOKEN',
        password: 'password'
      })
      .put({
        type: AUTH_UPDATE_PASSWORD_SUCCESS,
        payload: {
          info: 'Password updated'
        }
      })
      .dispatch({
        type: AUTH_UPDATE_PASSWORD,
        payload: { token: 'TOKEN', password: 'password' }
      })
      .silentRun();
  });

  it('should handle error', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error'
          }
        }
      })
    );

    return expectSaga(authUpdatePasswordSaga)
      .put({
        type: AUTH_UPDATE_PASSWORD_ERROR,
        payload: { error: 'Error' }
      })
      .dispatch({
        type: AUTH_UPDATE_PASSWORD,
        payload: {  passwordResetToken: 'TOKEN', password: 'password' }
      })
      .silentRun();
  });
});
