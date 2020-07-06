import { call, takeLatest, put } from 'redux-saga/effects'
import { push } from 'connected-react-router';
import axios from 'axios';
import { api } from 'config';
import { AUTH_REGISTER, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR, AuthRegister } from '../actions';


function* handle(action: AuthRegister) {
  const { email, password, firstName, lastName } = action.payload;
  try {
    const result = yield call(
      axios.post,
      `${api}/auth/register`,
      { email, password, firstName, lastName },
    );
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

export function* registerSaga() {
  yield takeLatest(AUTH_REGISTER, handle);
}