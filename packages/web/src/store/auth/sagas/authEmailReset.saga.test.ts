import { expectSaga } from 'redux-saga-test-plan';
import { http } from 'services';
import {
  AUTH_RESET_EMAIL,
  AUTH_RESET_EMAIL_SUCCESS,
  AUTH_RESET_EMAIL_ERROR
} from '../actions';
import { authEmailResetSaga } from './authEmailReset.saga';

jest.mock('services', () => ({
  http: {
    get: jest.fn()
  }
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('system/authEmailResetSaga', () => {
  it('should call api', () => {
    jest.spyOn(http, 'get').mockImplementationOnce(() => Promise.resolve({}));

    return expectSaga(authEmailResetSaga)
      .call(http.get, '/management/email-reset')
      .put({
        type: AUTH_RESET_EMAIL_SUCCESS,
        payload: {
          info:
            'Check your email for email change confirmation message and follow provided link!'
        }
      })
      .dispatch({
        type: AUTH_RESET_EMAIL
      })
      .silentRun();
  });

  it('should handle error', () => {
    jest.spyOn(http, 'get').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error'
          }
        }
      })
    );

    return expectSaga(authEmailResetSaga)
      .put({
        type: AUTH_RESET_EMAIL_ERROR,
        payload: { error: 'Error' }
      })
      .dispatch({
        type: AUTH_RESET_EMAIL
      })
      .silentRun();
  });
});
