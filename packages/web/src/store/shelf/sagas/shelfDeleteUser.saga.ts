import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_DELETE_USER,
  SHELF_DELETE_USER_SUCCESS,
  SHELF_DELETE_USER_ERROR,
  ShelfDeleteUser,
} from '../actions';

function* handle(action: ShelfDeleteUser) {
  const { shelfId, userId } = action.payload;

  try {
    yield call(http.post, '/shelf/user-delete', {
      shelfId,
      userId,
    });
    yield put({
      type: SHELF_DELETE_USER_SUCCESS,
      payload: { info: 'User deleted successfully' }
    });
  } catch (e) {
    yield put({
      type: SHELF_DELETE_USER_ERROR,
      payload: { error: e.response.data.message }
    });
  }
}

export function* shelfDeleteUserSaga() {
  yield takeLatest(SHELF_DELETE_USER, handle);
}
