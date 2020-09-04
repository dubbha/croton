import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_MOVE_FLOWER,
  SHELF_MOVE_FLOWER_SUCCESS,
  SHELF_MOVE_FLOWER_ERROR,
  ShelfMoveFlower,
} from '../actions';

function* handle(action: ShelfMoveFlower) {
  const { flowerId, currentShelfId, targetShelfId } = action.payload;

  try {
    const payload = yield call(http.post, '/shelf/move-flower', {
      flowerId,
      currentShelfId,
      targetShelfId,
    });
    yield put({
      type: SHELF_MOVE_FLOWER_SUCCESS,
      payload,
    });
  } catch (e) {
    yield put({
      type: SHELF_MOVE_FLOWER_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfAddFlowerSaga() {
  yield takeLatest(SHELF_MOVE_FLOWER, handle);
}
