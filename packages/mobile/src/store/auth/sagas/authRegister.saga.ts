import { call, takeLatest, put } from 'redux-saga/effects';

import { AUTH_REGISTER, AuthRegister, AUTH_CONFIRM_EMAIL } from '../actions';
import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { httpSender } from './../../../services/http/http.service';

function* handle(action: AuthRegister) {
  try {
    const { email, password, firstName, lastName } = action.payload;

    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/auth/register',
      body: { email, password, firstName, lastName, facebookId: 'fff' },
    });
    const { status } = result;
    if (status === true) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: result.message },
      });
      yield put({
        type: AUTH_CONFIRM_EMAIL,
        payload: { isEmailVerification: true },
      });
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
      });
    }
  } catch (e) {
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message },
    });
  }
}

export function* authRegisterSaga() {
  yield takeLatest(AUTH_REGISTER, handle);
}
