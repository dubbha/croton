import { call, takeLatest, put } from 'redux-saga/effects';
import { http } from 'services';
import {
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_ERROR,
  AuthResetPassword
} from '../actions';

function* handle(action: AuthResetPassword) {
  const { email } = action.payload;

  try {
    yield call(http.post, '/auth/password-reset', { email });
    yield put({
      type: AUTH_RESET_PASSWORD_SUCCESS,
      payload: {
        info: `If an account exists for ${email}, you will get an email with instructions on resetting your password.
          If it doesn't arrive, be sure to check your spam folder.`
      }
    });
  } catch (e) {
    yield put({
      type: AUTH_RESET_PASSWORD_ERROR,
      payload: { error: e.response.data.message }
    });
  }
}

export function* authResetPasswordSaga() {
  yield takeLatest(AUTH_RESET_PASSWORD, handle);
}
