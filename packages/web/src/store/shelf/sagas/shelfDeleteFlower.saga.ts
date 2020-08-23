import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { http } from 'services';
import {
  SHELF_DELETE_FLOWER,
  SHELF_DELETE_FLOWER_SUCCESS,
  SHELF_DELETE_FLOWER_ERROR,
  ShelfDeleteFlower,
} from '../actions';

function* handle(action: ShelfDeleteFlower) {
  const { id, shelfId } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/delete-flower',
      { id, shelfId }
    );
    yield put({
      type: SHELF_DELETE_FLOWER_SUCCESS,
      payload: { info: 'Shelf added successfully' }
    });
    yield put(push(`/profile/shelf/${shelfId}`));
  } catch (e) {
    yield put({
      type: SHELF_DELETE_FLOWER_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfDeleteFlowerSaga() {
  yield takeLatest(SHELF_DELETE_FLOWER, handle);
}
