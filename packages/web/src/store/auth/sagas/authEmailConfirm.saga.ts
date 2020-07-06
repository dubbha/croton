import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { api } from 'config';
import { push } from 'connected-react-router';
import {
  AUTH_EMAIL_CONFIRM,
  AUTH_EMAIL_CONFIRM_SUCCESS,
  AUTH_EMAIL_CONFIRM_ERROR,
  AuthEmailConfirm,
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
    const result = yield call(
      axios.post,
      `${api}/auth/confirm`,
      { emailVerificationToken },
    );
    yield put({
      type: AUTH_EMAIL_CONFIRM_SUCCESS,
      payload: result.data
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