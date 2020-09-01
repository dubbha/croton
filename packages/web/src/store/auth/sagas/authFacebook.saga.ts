import { takeLatest, call } from 'redux-saga/effects';

import {
  AUTH_FACEBOOK_ERROR,
  AuthFacebook,
  AUTH_FACEBOOK_SUCCESS,
  AUTH_FACEBOOK,
} from '../actions';

import { handleAuthViaSocials } from './handleAuthViaSocials.saga';

function* handle(action: AuthFacebook) {
  yield call(handleAuthViaSocials, {
    accessToken: action.payload.accessToken,
    apiEndpoint: '/auth/facebook',
    successActionType: AUTH_FACEBOOK_SUCCESS,
    errorActionType: AUTH_FACEBOOK_ERROR,
  });
}

export function* authFacebook() {
  yield takeLatest(AUTH_FACEBOOK, handle);
}
