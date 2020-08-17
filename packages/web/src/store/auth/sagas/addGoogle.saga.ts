import { takeLatest, call, select } from 'redux-saga/effects';

import {
  ADD_GOOGLE_ERROR,
  AddGoogle,
  ADD_GOOGLE_SUCCESS,
  ADD_GOOGLE,
} from '../actions';

import { handleAuthViaSocials } from './handleAuthViaSocials.saga';
import { getAuth } from '../selectors';

function* handle(action: AddGoogle) {
  const { email } = yield select(getAuth);

  yield call(handleAuthViaSocials, {
    accessToken: action.payload.accessToken,
    apiEndpoint: '/management/add-google',
    successActionType: ADD_GOOGLE_SUCCESS,
    errorActionType: ADD_GOOGLE_ERROR,
    email,
  });
}

export function* addGoogle() {
  yield takeLatest(ADD_GOOGLE, handle);
}
