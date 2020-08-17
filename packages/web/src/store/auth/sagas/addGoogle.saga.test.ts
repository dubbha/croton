import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import { ADD_GOOGLE_ERROR, ADD_GOOGLE_SUCCESS, ADD_GOOGLE } from '../actions';
import { getAuth } from '../selectors';

import { addGoogle } from './addGoogle.saga';
import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

describe('system/addGoogle', () => {
  const accessToken = 'someMock235678765t';
  const email = 'somemockemail@mock.com';

  it('should handle add Google profile with creds', () => {
    return expectSaga(addGoogle)
      .provide([
        [select(getAuth), { email }],
        [
          call(handleAuthViaSocials, {
            accessToken,
            apiEndpoint: '/management/add-google',
            successActionType: ADD_GOOGLE_SUCCESS,
            errorActionType: ADD_GOOGLE_ERROR,
            email,
          }),
          undefined,
        ],
      ])
      .call(handleAuthViaSocials, {
        accessToken,
        apiEndpoint: '/management/add-google',
        successActionType: ADD_GOOGLE_SUCCESS,
        errorActionType: ADD_GOOGLE_ERROR,
        email,
      })
      .dispatch({
        type: ADD_GOOGLE,
        payload: { accessToken },
      })
      .silentRun();
  });
});
