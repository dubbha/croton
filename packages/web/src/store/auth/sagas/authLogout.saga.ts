import { takeLatest, call } from 'redux-saga/effects';
import { AUTH_LOGOUT } from '../actions';

function* handle() {
  try {
    yield call([localStorage, localStorage.clear]);
  } catch (e) {
    yield call(console.log, 'log', e);
  }
}

export function* authLogoutSaga() {
  yield takeLatest(AUTH_LOGOUT, handle);
}
