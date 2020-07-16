import { expectSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import { environments } from 'config';
import {
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR
} from '../actions';
import { authRegisterSaga } from './authRegister.saga';

jest.mock('axios', () => ({
  post: jest.fn()
}));

jest.mock('connected-react-router', () => ({
  push: (path: string) => ({ type: 'callHistoryMethod', payload: { path } })
}));

describe('system/authRegisterSaga', () => {
  const data = {
    firstName: 'FIRST_NAME',
    lastName: 'LAST_NAME',
    email: 'EMAIL',
    password: 'PASSWORD12345',
    facebookId: 'fff' // TODO: remove me
  };
  it('should call api', () => {
    jest
      .spyOn(axios, 'post')
      .mockImplementationOnce(() => Promise.resolve({ ...data }));

    return expectSaga(authRegisterSaga)
      .call(axios.post, `${environments.local.api}/auth/register`, {
        ...data
      })
      .put({
        type: AUTH_REGISTER_SUCCESS,
        payload: {
          info: 'Please check your email for verification before signing in'
        }
      })
      .dispatch({
        type: AUTH_REGISTER,
        payload: {
          ...data
        }
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

    return expectSaga(authRegisterSaga)
      .put({
        type: AUTH_REGISTER_ERROR,
        payload: { error: 'Error' }
      })
      .dispatch({
        type: AUTH_REGISTER,
        payload: {
          email: data.email,
          password: 'admin',
          firstName: data.firstName,
          lastName: data.lastName
        }
      })
      .silentRun();
  });
});
