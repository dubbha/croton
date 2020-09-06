import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_MOVE_FLOWER,
  SHELF_MOVE_FLOWER_SUCCESS,
  SHELF_MOVE_FLOWER_ERROR,
  ShelfMoveFlower,
} from '../actions';

function* handle(action: ShelfMoveFlower) {
  const { flowerId, shelfId, targetShelfId } = action.payload;

  try {
    const { data } = yield call(http.post, '/shelf/move-flower', {
      flowerId,
      shelfId,
      targetShelfId,
    });
    yield put({
      type: SHELF_MOVE_FLOWER_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: SHELF_MOVE_FLOWER_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfMoveFlowerSaga() {
  yield takeLatest(SHELF_MOVE_FLOWER, handle);
}
