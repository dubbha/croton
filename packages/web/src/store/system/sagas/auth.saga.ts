import { call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { api } from 'config';
import { SYSTEM_AUTH, SystemAuthAction } from '../actions';


function* handleAuth(action: SystemAuthAction) {
  const { email, password } = action.payload;
  yield call(console.log, email, password);
  try {
    yield call(
      axios.post,
      `${api}/auth/login`,
      { email, password },
    );
  } catch (e) {
    console.error(e);
  }
}

export function* authSaga() {
  yield takeLatest(SYSTEM_AUTH, handleAuth);
}