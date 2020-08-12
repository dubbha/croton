import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_GET_SHELVES,
  SHELF_GET_SHELVES_SUCCESS,
  SHELF_GET_SHELVES_ERROR,
} from '../actions';

function* handle() {
  try {
    const { data } = yield call(
      http.post,
      '/shelf/get-shelves'
    );
    yield put({
      type: SHELF_GET_SHELVES_SUCCESS,
      payload: { shelves: data }
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SHELF_GET_SHELVES_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfGetShelvesSaga() {
  yield takeLatest(SHELF_GET_SHELVES, handle);
}
