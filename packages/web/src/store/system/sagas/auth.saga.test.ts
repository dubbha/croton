import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import axios from 'axios';
import { environments } from 'config';
import { SYSTEM_AUTH } from '../actions';
import { authSaga } from './auth.saga';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

describe(('system/authSaga'), () => {
  it('should call api', () =>
    expectSaga(authSaga)
      .call(
        axios.post,
        `${environments.local.api}/auth/login`,
        { email: 'admin@admin.com', password: 'admin' })
      .dispatch({
        type: SYSTEM_AUTH,
        payload: { email: 'admin@admin.com', password: 'admin' }
      })
      .silentRun()
  );

  it('should output error to console', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    const e = new Error('ERROR');

    return expectSaga(authSaga)
      .provide([
        [matchers.call.fn(axios.post), throwError(e)],
      ])
      .call(console.error, e)
      .dispatch({
        type: SYSTEM_AUTH,
        payload: { email: 'admin@admin.com', password: 'admin' }
      })
      .silentRun();
  })
})