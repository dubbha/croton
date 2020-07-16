import { call, takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { api } from 'config';
import {
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AuthRegister
} from '../actions';

function* handle(action: AuthRegister) {
  const { email, password, firstName, lastName } = action.payload;

  try {
    yield call(axios.post, `${api}/auth/register`, {
      email,
      password,
      firstName,
      lastName,
      facebookId: 'fff' // TODO: remove me
    });
    yield put({
      type: AUTH_REGISTER_SUCCESS,
      payload: {
        info: 'Please check your email for verification before signing in'
      }
    });
  } catch (e) {
    yield put({
      type: AUTH_REGISTER_ERROR,
      payload: { error: e.response.data.message }
    });
  }
}

export function* authRegisterSaga() {
  yield takeLatest(AUTH_REGISTER, handle);
}
