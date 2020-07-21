import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';

import {
  AUTH_FACEBOOK_ERROR,
  AUTH_FACEBOOK_SUCCESS,
  AUTH_FACEBOOK
} from '../actions';
import { authFacebook } from './authFacebook.saga';
import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

describe('system/authFacebook', () => {
  const accessToken = 'someMock235678765t';

  it('should handle auth via socials with facebook creds', () => {
    return expectSaga(authFacebook)
      .provide([
        [
          call(handleAuthViaSocials, {
            accessToken,
            apiEndpoint: '/auth/facebook',
            successActionType: AUTH_FACEBOOK_SUCCESS,
            errorActionType: AUTH_FACEBOOK_ERROR
          }),
          undefined
        ]
      ])
      .call(handleAuthViaSocials, {
        accessToken,
        apiEndpoint: '/auth/facebook',
        successActionType: AUTH_FACEBOOK_SUCCESS,
        errorActionType: AUTH_FACEBOOK_ERROR
      })
      .dispatch({
        type: AUTH_FACEBOOK,
        payload: { accessToken }
      })
      .silentRun();
  });
});
