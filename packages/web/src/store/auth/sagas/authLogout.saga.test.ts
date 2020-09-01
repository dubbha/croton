import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { AUTH_LOGOUT } from '../actions';
import { authLogoutSaga } from './authLogout.saga';

describe('authUpdateProfileSaga', () => {
  it('should logout', () => expectSaga(authLogoutSaga)
    .call([localStorage, localStorage.clear])
    .dispatch({ type: AUTH_LOGOUT })
    .silentRun());

  it('should handle error', () => {
    console.error = jest.fn();
    const e = new Error('ERR');

    return expectSaga(authLogoutSaga)
      .provide([
        [matchers.call.fn(localStorage.clear), throwError(e)],
      ])
      .call(console.error, e)
      .dispatch({ type: AUTH_LOGOUT })
      .silentRun();
  });
});
