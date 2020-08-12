import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_ADD_SHELF,
  SHELF_ADD_SHELF_SUCCESS,
  SHELF_ADD_SHELF_ERROR,
  ShelfAddShelf,
} from '../actions';

function* handle(action: ShelfAddShelf) {
  const { name, location, description } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/add-shelf',
      { name, location, description }
    );
    yield put({
      type: SHELF_ADD_SHELF_SUCCESS,
      payload: { info: 'Shelf added successfully' }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SHELF_ADD_SHELF_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfAddShelfSaga() {
  yield takeLatest(SHELF_ADD_SHELF, handle);
}
