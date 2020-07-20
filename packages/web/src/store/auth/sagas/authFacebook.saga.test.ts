import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { http } from 'services';

import { getEnvironment } from 'config';
import {
  AUTH_FACEBOOK_ERROR,
  AUTH_FACEBOOK_SUCCESS,
  AUTH_FACEBOOK,
} from '../actions';
import { authFacebook } from './authFacebook.saga';

jest.mock('services', () => ({
  http: {
    post: jest.fn(),
  }
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } }),
}));

describe('system/authFacebook', () => {
  const api = 'someMockApi';
  const accessToken = 'someMock235678765t';
  const data = {
    id: 'ID',
    fistName: 'FIRST_NAME',
    lastName: 'LAST_NAME',
    email: 'EMAIL',
    token: 'TOKEN',
  };

  it('should call api', () => {
    jest
      .spyOn(http, 'post')
      .mockImplementationOnce(() => Promise.resolve({ data }));

    return expectSaga(authFacebook)
      .provide([[call(getEnvironment), { api }]])
      .call(http.post, '/auth/facebook', { access_token: accessToken })
      .put({
        type: AUTH_FACEBOOK_SUCCESS,
        payload: data,
      })
      .put(push('/profile'))
      .dispatch({
        type: AUTH_FACEBOOK,
        payload: { accessToken },
      })
      .silentRun();
  });

  it('should hanlde error', () => {
    jest.spyOn(http, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error',
          },
        },
      })
    );

    return expectSaga(authFacebook)
      .put({
        type: AUTH_FACEBOOK_ERROR,
        payload: { error: 'Error' },
      })
      .dispatch({
        type: AUTH_FACEBOOK,
        payload: { accessToken },
      })
      .silentRun();
  });
});
