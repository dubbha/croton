import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_EDIT_FLOWER,
  SHELF_EDIT_FLOWER_SUCCESS,
  SHELF_EDIT_FLOWER_ERROR,
  ShelfEditFlower,
} from '../actions';

function* handle(action: ShelfEditFlower) {
  try {
    yield call(
      http.post,
      '/shelf/edit-flower',
      { ...action.payload },
    );
    yield put({
      type: SHELF_EDIT_FLOWER_SUCCESS,
      payload: { info: 'Flower updated successfully' }
    });
  } catch (e) {
    yield put({
      type: SHELF_EDIT_FLOWER_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfEditFlowerSaga() {
  yield takeLatest(SHELF_EDIT_FLOWER, handle);
}
