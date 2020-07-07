import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import axios from 'axios';
import { environments } from 'config';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR } from '../actions';
import { authLoginSaga } from './authLogin.saga';

jest.mock('axios', () => ({
  post: jest.fn()
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('system/authLoginSaga', () => {
  it('should call api', () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          id: 'ID',
          name: 'NAME',
          email: 'EMAIL',
          token: 'TOKEN'
        }
      })
    );

    return expectSaga(authLoginSaga)
      .call(axios.post, `${environments.local.api}/auth/login`, {
        email: 'admin@admin.com',
        password: 'admin'
      })
      .put({
        type: AUTH_LOGIN_SUCCESS,
        payload: { id: 'ID', name: 'NAME', email: 'EMAIL', token: 'TOKEN' }
      })
      .put(push('/profile'))
      .dispatch({
        type: AUTH_LOGIN,
        payload: { email: 'admin@admin.com', password: 'admin' }
      })
      .silentRun();
  });

  it('should hanlde error', () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error'
          }
        }
      })
    );

    return expectSaga(authLoginSaga)
      .put({
        type: AUTH_LOGIN_ERROR,
        payload: { error: 'Error' }
      })
      .dispatch({
        type: AUTH_LOGIN,
        payload: { email: 'admin@admin.com', password: 'admin' }
      })
      .silentRun();
  });
});
