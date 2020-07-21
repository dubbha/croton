import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import { push } from 'connected-react-router';
import {
  AUTH_EMAIL_CONFIRM,
  AUTH_EMAIL_CONFIRM_SUCCESS,
  AUTH_EMAIL_CONFIRM_ERROR,
  AuthEmailConfirm
} from '../actions';

function* handle(action: AuthEmailConfirm) {
  const { emailVerificationToken } = action.payload;

  if (!emailVerificationToken) {
    yield put({
      type: AUTH_EMAIL_CONFIRM_ERROR,
      payload: { error: 'Token parse error' }
    });
    return;
  }

  try {
    const result = yield call(http.post, '/auth/confirm', {
      emailVerificationToken
    });
    const {
      data: { token, ...userData }
    } = result;
    yield call([localStorage, localStorage.setItem], 'authToken', token);
    yield put({
      type: AUTH_EMAIL_CONFIRM_SUCCESS,
      payload: userData
    });
    yield put(push('/profile'));
  } catch (e) {
    yield put({
      type: AUTH_EMAIL_CONFIRM_ERROR,
      payload: { error: e.response.data.message }
    });
  }
}

export function* authEmailConfirmSaga() {
  yield takeLatest(AUTH_EMAIL_CONFIRM, handle);
}
