import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import {
  AUTH_GOOGLE_ERROR,
  AUTH_GOOGLE_SUCCESS,
  AUTH_GOOGLE
} from '../actions';
import { authGoogle } from './authGoogle.saga';
import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

describe('system/authGoogle', () => {
  const accessToken = 'someMock235678765t';

  it('should handle auth via socials with google creds', () => {
    return expectSaga(authGoogle)
      .provide([
        [
          call(handleAuthViaSocials, {
            accessToken,
            apiEndpoint: '/auth/google',
            successActionType: AUTH_GOOGLE_SUCCESS,
            errorActionType: AUTH_GOOGLE_ERROR
          }),
          undefined
        ]
      ])
      .call(handleAuthViaSocials, {
        accessToken,
        apiEndpoint: '/auth/google',
        successActionType: AUTH_GOOGLE_SUCCESS,
        errorActionType: AUTH_GOOGLE_ERROR
      })
      .dispatch({
        type: AUTH_GOOGLE,
        payload: { accessToken }
      })
      .silentRun();
  });
});
