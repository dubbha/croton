import { call, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import { api } from 'config';
import { SYSTEM_REGISTER, SystemRegisterAction } from '../actions';


function* handleRegister(action: SystemRegisterAction) {
  const { email, password, firstName, lastName } = action.payload;
  try {
    yield call(
      axios.post,
      `${api}/auth/register`,
      { email, password, firstName, lastName },
    );
  } catch (e) {
    yield call(console.error, e);
  }
}

export function* registerSaga() {
  yield takeLatest(SYSTEM_REGISTER, handleRegister);
}