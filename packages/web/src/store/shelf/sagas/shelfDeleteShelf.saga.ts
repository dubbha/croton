import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { http } from 'services';
import {
  SHELF_DELETE_SHELF,
  SHELF_DELETE_SHELF_SUCCESS,
  SHELF_DELETE_SHELF_ERROR,
  ShelfDeleteShelf,
} from '../actions';

function* handle(action: ShelfDeleteShelf) {
  const { id } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/delete-shelf',
      { id },
    );
    yield put({
      type: SHELF_DELETE_SHELF_SUCCESS,
      payload: { info: 'Shelf deleted successfully' },
    });
    yield put(push('/profile/shelves'));
  } catch (e) {
    yield put({
      type: SHELF_DELETE_SHELF_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfDeleteShelfSaga() {
  yield takeLatest(SHELF_DELETE_SHELF, handle);
}
