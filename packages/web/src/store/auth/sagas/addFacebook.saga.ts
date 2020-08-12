import { takeLatest, call, select } from 'redux-saga/effects';

import {
  ADD_FACEBOOK_ERROR,
  AddFacebook,
  ADD_FACEBOOK_SUCCESS,
  ADD_FACEBOOK,
} from '../actions';

import { handleAuthViaSocials } from './handleAuthViaSocials.saga';
import { getAuth } from '../selectors';

function* handle(action: AddFacebook) {
  const { email } = yield select(getAuth);
  yield call(handleAuthViaSocials, {
    accessToken: action.payload.accessToken,
    apiEndpoint: '/management/add-facebook',
    successActionType: ADD_FACEBOOK_SUCCESS,
    errorActionType: ADD_FACEBOOK_ERROR,
    email,
  });
}

export function* addFacebook() {
  yield takeLatest(ADD_FACEBOOK, handle);
}
