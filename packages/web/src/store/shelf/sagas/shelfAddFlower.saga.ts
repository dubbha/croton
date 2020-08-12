import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_ADD_FLOWER,
  SHELF_ADD_FLOWER_SUCCESS,
  SHELF_ADD_FLOWER_ERROR,
  ShelfAddFlower,
} from '../actions';

function* handle(action: ShelfAddFlower) {
  const { shelfId, name, description } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/add-flower',
      { shelfId, name, description }
    );
    yield put({
      type: SHELF_ADD_FLOWER_SUCCESS,
      payload: { info: 'Flower added successfully' }
    });
  } catch (e) {
    yield put({
      type: SHELF_ADD_FLOWER_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfAddFlowerSaga() {
  yield takeLatest(SHELF_ADD_FLOWER, handle);
}
