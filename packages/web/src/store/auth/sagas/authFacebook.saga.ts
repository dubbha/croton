import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';

import { getEnvironment } from 'config';

import {
  AUTH_FACEBOOK_ERROR,
  AuthFacebook,
  AUTH_FACEBOOK_SUCCESS,
  AUTH_FACEBOOK,
} from '../actions';

function* handle(action: AuthFacebook) {
  const { accessToken } = action.payload;
  const { api } = yield call(getEnvironment);
  try {
    const result = yield call(axios.post, `${api}/auth/facebook`, {
      access_token: accessToken,
    });
    yield put({
      type: AUTH_FACEBOOK_SUCCESS,
      payload: result.data,
    });
    yield put(push('/profile'));
  } catch (e) {
    yield put({
      type: AUTH_FACEBOOK_ERROR,
      payload: { error: e.response.data.message },
    });
  }
}

export function* authFacebook() {
  yield takeLatest(AUTH_FACEBOOK, handle);
}
