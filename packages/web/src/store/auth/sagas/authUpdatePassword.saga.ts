import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { api } from 'config';
import {
  AUTH_UPDATE_PASSWORD,
  AUTH_UPDATE_PASSWORD_SUCCESS,
  AUTH_UPDATE_PASSWORD_ERROR,
  AuthUpdatePassword
} from '../actions';

function* handle(action: AuthUpdatePassword) {
  const { token, password } = action.payload;

  try {
    yield call(axios.post, `${api}/auth/password-update`, {
      passwordResetToken: token,
      password
    });
    yield put({
      type: AUTH_UPDATE_PASSWORD_SUCCESS,
      payload: {
        info: 'Password updated'
      }
    });
  } catch (e) {
    yield put({
      type: AUTH_UPDATE_PASSWORD_ERROR,
      payload: { error: e.response.data.message }
    });
  }
}

export function* authUpdatePasswordSaga() {
  yield takeLatest(AUTH_UPDATE_PASSWORD, handle);
}
