import { call, takeLatest, put } from 'redux-saga/effects';
import { http } from 'services';
import {
  AUTH_RESET_EMAIL,
  AUTH_RESET_EMAIL_SUCCESS,
  AUTH_RESET_EMAIL_ERROR,
} from '../actions';

function* handle() {
  try {
    yield call(http.get, '/management/email-reset');
    yield put({
      type: AUTH_RESET_EMAIL_SUCCESS,
      payload: {
        info: 'Check your email for email change confirmation message and follow provided link!',
      },
    });
  } catch (e) {
    yield put({
      type: AUTH_RESET_EMAIL_ERROR,
      payload: { error: e.response.data.message },
    });
  }
}

export function* authEmailResetSaga() {
  yield takeLatest(AUTH_RESET_EMAIL, handle);
}
