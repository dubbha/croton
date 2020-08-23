import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_GET_FLOWER,
  SHELF_GET_FLOWER_SUCCESS,
  SHELF_GET_FLOWER_ERROR,
  ShelfGetFlower,
} from '../actions';

function* handle(action: ShelfGetFlower) {
  try {
    const { data } = yield call(
      http.post,
      '/shelf/get-flower',
      { id: action.payload.id },
    );
    const { shelf, ...rest } = data;
    yield put({
      type: SHELF_GET_FLOWER_SUCCESS,
      payload: { flower: { ...rest, shelfId: shelf.id } },
    });
  } catch (e) {
    yield put({
      type: SHELF_GET_FLOWER_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfGetFlowerSaga() {
  yield takeLatest(SHELF_GET_FLOWER, handle);
}
