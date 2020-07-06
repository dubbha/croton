import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { api } from 'config';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AuthLogin,
  AUTH_LOGIN_SUCCESS
} from '../actions';

function* handle(action: AuthLogin) {
  const { email, password } = action.payload;
  try {
    const result = yield call(axios.post, `${api}/auth/login`, {
      email,
      password
    });
    yield put({
      type: AUTH_LOGIN_SUCCESS,
      payload: result.data
    });
    yield put(push('/profile'));
  } catch (e) {
    yield put({
      type: AUTH_LOGIN_ERROR,
      payload: { error: e.response.data.message }
    });
  }
}

export function* authLoginSaga() {
  yield takeLatest(AUTH_LOGIN, handle);
}
