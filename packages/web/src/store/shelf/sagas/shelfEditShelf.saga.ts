import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_EDIT_SHELF,
  SHELF_EDIT_SHELF_SUCCESS,
  SHELF_EDIT_SHELF_ERROR,
  ShelfEditShelf,
} from '../actions';

function* handle(action: ShelfEditShelf) {
  const { id, name, location, description } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/edit-shelf',
      { id, name, location, description }
    );
    yield put({
      type: SHELF_EDIT_SHELF_SUCCESS,
      payload: { info: 'Shelf updated successfully' }
    });
  } catch (e) {
    yield put({
      type: SHELF_EDIT_SHELF_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfEditShelfSaga() {
  yield takeLatest(SHELF_EDIT_SHELF, handle);
}
