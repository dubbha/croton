import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_GET_FLOWERS,
  SHELF_GET_FLOWERS_SUCCESS,
  SHELF_GET_FLOWERS_ERROR,
  ShelfGetFlowers,
} from '../actions';

function* handle(action: ShelfGetFlowers) {
  try {
    const { data } = yield call(
      http.post,
      '/shelf/get-flowers',
      { shelfId: action.payload.shelfId }
    );
    yield put({
      type: SHELF_GET_FLOWERS_SUCCESS,
      payload: { flowers: data }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SHELF_GET_FLOWERS_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfGetFlowersSaga() {
  yield takeLatest(SHELF_GET_FLOWERS, handle);
}
