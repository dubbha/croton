import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_GET_ACTIONS,
  SHELF_GET_ACTIONS_SUCCESS,
  SHELF_GET_ACTIONS_ERROR,
  ShelfGetActions,
} from '../actions';

function* handle(action: ShelfGetActions) {
  try {
    const { flowerId } = action.payload;
    const { data } = yield call(
      http.get,
      '/shelf/get-actions',
      { params: { flowerId } },
    );
    yield put({
      type: SHELF_GET_ACTIONS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: SHELF_GET_ACTIONS_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfGetActionsSaga() {
  yield takeLatest(SHELF_GET_ACTIONS, handle);
}
