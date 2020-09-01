import { takeLatest, call, put } from 'redux-saga/effects';

import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AuthLogin } from '../actions';
import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { httpSender } from './../../../services/http/http.service';

function* handle(action: AuthLogin) {
  try {
    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/auth/login',
      body: action.payload,
    });

    if (!result.token) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
      });
    } else {
      yield put({
        type: AUTH_LOGIN_SUCCESS,
        payload: result,
      });

      httpSender.setAuthorizationToken(result.token);
    }
  } catch (e) {
    // TODO: now this is useless catch, should fix it
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.data.message },
    });
  }
}

export function* authLoginSaga() {
  yield takeLatest(AUTH_LOGIN, handle);
}
