import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  AUTH_GET_INVITES,
  AUTH_GET_INVITES_SUCCESS,
  AUTH_GET_INVITES_ERROR,
} from '../actions';

function* handle() {
  try {
    const { data } = yield call(
      http.get,
      '/management/user-invites',
    );
    yield put({
      type: AUTH_GET_INVITES_SUCCESS,
      payload: { invites: data },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: AUTH_GET_INVITES_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* authGetInvitesSaga() {
  yield takeLatest(AUTH_GET_INVITES, handle);
}
