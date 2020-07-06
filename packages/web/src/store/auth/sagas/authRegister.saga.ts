import { call, takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { api } from 'config';
import {
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AuthRegister,
} from '../actions';


function* handle(action: AuthRegister) {
  const { email, password, firstName, lastName } = action.payload;
  const name = `${firstName} ${lastName}`;

  try {
    const result = yield call(
      axios.post,
      `${api}/auth/register`,
      {
        email,
        password,
        name,
        facebookId: 'fff', // TODO: remove me
        googleId: 'ggg', // TODO: remove me
      },
    );
    yield put({
      type: AUTH_REGISTER_SUCCESS,
      payload: result.data
    });
    yield put(push('/signin'));
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