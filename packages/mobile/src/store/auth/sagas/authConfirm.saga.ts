import { call, takeLatest, put, delay } from 'redux-saga/effects';

import { AuthConfirm, AUTH_CONFIRM, AUTH_LOGIN_SUCCESS } from '../actions';
import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { httpSender } from './../../../services/http/http.service';

function* handle(action: AuthConfirm) {
  try {
    const { code } = action.payload;
    yield put({ type: INFORMATION_LOADER });
    const result = yield call(httpSender.send, {
      router: '/api/auth/mobile-confirm',
      body: { mobileVerificationToken: code },
    });
    if (result) {
      const isResultValid = result.id;
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: 'Login...' },
      });
      if (!isResultValid) {
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
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
      });
    }
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  } catch (e) {
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message },
    });
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  }
}

export function* authConfirmSaga() {
  yield takeLatest(AUTH_CONFIRM, handle);
}
