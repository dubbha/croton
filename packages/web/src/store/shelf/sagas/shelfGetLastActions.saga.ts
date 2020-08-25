import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_GET_LAST_ACTIONS,
  SHELF_GET_LAST_ACTIONS_SUCCESS,
  SHELF_GET_LAST_ACTIONS_ERROR,
  ShelfGetLastActions,
} from '../actions';

function* handle(action: ShelfGetLastActions) {
  try {
    const { flowerId, shelfId } = action.payload;
    const { data } = yield call(
      http.post,
      '/shelf/get-last-actions',
      { flowerId, shelfId },
    );
    yield put({
      type: SHELF_GET_LAST_ACTIONS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: SHELF_GET_LAST_ACTIONS_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfGetLastActionsSaga() {
  yield takeLatest(SHELF_GET_LAST_ACTIONS, handle);
}
