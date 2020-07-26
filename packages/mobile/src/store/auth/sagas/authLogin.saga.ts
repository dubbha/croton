import { takeLatest, call, put } from 'redux-saga/effects';

import {
  AUTH_LOGIN,
  AUTH_NOTIFY,
  AUTH_LOGIN_SUCCESS,
  AuthLogin,
} from '../actions';
import { httpSender } from './../../../services/http/http.service';

function* handle(action: AuthLogin) {
  try {
    const { email, password } = action.payload;
    const result = yield call(httpSender.send, {
      router: '/api/auth/login',
      body: { email, password },
    });

    if (!result.token) {
      yield put({
        type: AUTH_NOTIFY,
        payload: { error: result.message },
      });
    } else {
      yield put({
        type: AUTH_LOGIN_SUCCESS,
        payload: result,
      });
    }
  } catch (e) {
    // TODO: now this is useless catch, should fix it
    yield put({
      type: AUTH_NOTIFY,
      payload: { error: e.data.message },
    });
  }
}

export function* authLoginSaga() {
  yield takeLatest(AUTH_LOGIN, handle);
}
