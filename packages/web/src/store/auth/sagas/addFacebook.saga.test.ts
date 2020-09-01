import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import {
  ADD_FACEBOOK_ERROR,
  ADD_FACEBOOK_SUCCESS,
  ADD_FACEBOOK,
} from '../actions';
import { getAuth } from '../selectors';

import { addFacebook } from './addFacebook.saga';
import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

describe('system/addFacebook', () => {
  const accessToken = 'someMock235678765t';
  const email = 'somemockemail@mock.com';

  it('should handle add Facebook profile with creds', () => expectSaga(addFacebook)
    .provide([
      [select(getAuth), { email }],
      [
        call(handleAuthViaSocials, {
          accessToken,
          apiEndpoint: '/management/add-facebook',
          successActionType: ADD_FACEBOOK_SUCCESS,
          errorActionType: ADD_FACEBOOK_ERROR,
          email,
        }),
        undefined,
      ],
    ])
    .call(handleAuthViaSocials, {
      accessToken,
      apiEndpoint: '/management/add-facebook',
      successActionType: ADD_FACEBOOK_SUCCESS,
      errorActionType: ADD_FACEBOOK_ERROR,
      email,
    })
    .dispatch({
      type: ADD_FACEBOOK,
      payload: { accessToken },
    })
    .silentRun());
});
