import { takeLatest, call, put, delay } from 'redux-saga/effects';

import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AuthLogin } from '../actions';
import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { httpSender } from './../../../services/http/http.service';

function* handle(action: AuthLogin) {
  try {
    const { email, password } = action.payload;
    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/auth/login',
      body: {
        email,
        password,
      },
    });
    if (!result.token) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: {
          error: result.message || 'Something wrong, pls try again later',
        },
      });
    } else {
      yield put({
        type: AUTH_LOGIN_SUCCESS,
        payload: result,
      });

      httpSender.setAuthorizationToken(result.token);
    }
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  } catch (e) {
    // TODO: now this is useless catch, should fix it
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.data.message },
    });
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  }
}

export function* authLoginSaga() {
  yield takeLatest(AUTH_LOGIN, handle);
}
