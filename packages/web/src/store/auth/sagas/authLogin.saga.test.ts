import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';
import axios from 'axios';
import { environments } from 'config';
import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR } from '../actions';
import { authLoginSaga } from './authLogin.saga';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } }),
}));

const data = {
  id: 'ID',
  fistName: 'FIRST_NAME',
  lastName: 'LAST_NAME',
  email: 'EMAIL',
  token: 'TOKEN',
};
const loginPayload = { email: 'admin@admin.com', password: 'admin' };

describe('system/authLoginSaga', () => {
  it('should call api', () => {
    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(() => Promise.resolve({ data }));

    return expectSaga(authLoginSaga)
      .call(axios.post, `${environments.local.api}/auth/login`, {
        ...loginPayload,
      })
      .put({
        type: AUTH_LOGIN_SUCCESS,
        payload: { ...data },
      })
      .put(push('/profile'))
      .dispatch({
        type: AUTH_LOGIN,
        payload: { ...loginPayload },
      })
      .silentRun();
  });

  it('should hanlde error', () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() =>
      Promise.reject({
        response: {
          data: {
            message: 'Error',
          },
        },
      })
    );

    return expectSaga(authLoginSaga)
      .put({
        type: AUTH_LOGIN_ERROR,
        payload: { error: 'Error' },
      })
      .dispatch({
        type: AUTH_LOGIN,
        payload: { ...loginPayload },
      })
      .silentRun();
  });
});
