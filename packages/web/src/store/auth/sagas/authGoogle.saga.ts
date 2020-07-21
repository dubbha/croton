import { takeLatest, call } from 'redux-saga/effects';

import {
  AUTH_GOOGLE_ERROR,
  AuthGoogle,
  AUTH_GOOGLE_SUCCESS,
  AUTH_GOOGLE
} from '../actions';

import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

function* handle(action: AuthGoogle) {
  yield call(handleAuthViaSocials, {
    accessToken: action.payload.accessToken,
    apiEndpoint: '/auth/google',
    successActionType: AUTH_GOOGLE_SUCCESS,
    errorActionType: AUTH_GOOGLE_ERROR
  });
}

export function* authGoogle() {
  yield takeLatest(AUTH_GOOGLE, handle);
}
