import { expectSaga } from 'redux-saga-test-plan';
import { http } from 'services';
import {
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_ERROR,
} from '../actions';
import { authResetPasswordSaga } from './authResetPassword.saga';

jest.mock('services', () => ({
  http: {
    post: jest.fn()
  }
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('authResetPasswordSaga', () => {
  it('should call api', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() => Promise.resolve({}));

    return expectSaga(authResetPasswordSaga)
      .call(http.post, '/auth/password-reset', {
        email: 'admin@admin.com',
      })
      .put({
        type: AUTH_RESET_PASSWORD_SUCCESS,
        payload: {
          info: `If an account exists for admin@admin.com, you will get an email with instructions on resetting your password.
          If it doesn't arrive, be sure to check your spam folder.`
        }
      })
      .dispatch({
        type: AUTH_RESET_PASSWORD,
        payload: { email: 'admin@admin.com' }
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

    return expectSaga(authResetPasswordSaga)
      .put({
        type: AUTH_RESET_PASSWORD_ERROR,
        payload: { error: 'Error' }
      })
      .dispatch({
        type: AUTH_RESET_PASSWORD,
        payload: { email: 'admin@admin.com' }
      })
      .silentRun();
  });
});
