import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_ACTION,
  SHELF_ACTION_SUCCESS,
  SHELF_ACTION_ERROR,
  ShelfAction,
} from '../actions';

function* handle(action: ShelfAction) {
  try {
    yield call(
      http.post,
      '/shelf/action',
      { ...action.payload },
    );
    yield put({
      type: SHELF_ACTION_SUCCESS,
      payload: { info: 'Action marked performed successfully' },
    });
  } catch (e) {
    yield put({
      type: SHELF_ACTION_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfActionSaga() {
  yield takeLatest(SHELF_ACTION, handle);
}
