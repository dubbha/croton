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
  it('should call api', () => {
    jest.spyOn(axios, 'post').mockImplementationOnce(() => Promise.resolve({}));

    return expectSaga(authRegisterSaga)
      .call(axios.post, `${environments.local.api}/auth/register`, {
        email: 'admin@admin.com',
        password: 'admin',
        firstName: 'FNAME',
        lastName: 'LNAME',
        facebookId: 'fff', // TODO: remove me
      })
      .put({
        type: AUTH_REGISTER_SUCCESS,
        payload: { info: 'Please check your email for verification before signing in' },
      })
      .dispatch({
        type: AUTH_REGISTER,
        payload: { email: 'admin@admin.com', password: 'admin',  firstName: 'FNAME', lastName: 'LNAME' }
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
        payload: { email: 'admin@admin.com', password: 'admin', name: 'NAME' }
      })
      .silentRun();
  });
});
