import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_GET_USERS,
  SHELF_GET_USERS_SUCCESS,
  SHELF_GET_USERS_ERROR,
  ShelfGetUsers,
} from '../actions';

function* handle(action: ShelfGetUsers) {
  try {
    const { shelfId } = action.payload;
    const { data } = yield call(
      http.get,
      '/shelf/get-users',
      { params: { shelfId } },
    );
    yield put({
      type: SHELF_GET_USERS_SUCCESS,
      payload: { users: data },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SHELF_GET_USERS_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfGetUsersSaga() {
  yield takeLatest(SHELF_GET_USERS, handle);
}
