import { put, call, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { SHELVES_GET, SHELVES_GET_SUCCESS } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle() {
  try {
    yield put({ type: INFORMATION_LOADER });

    const shelves = yield call(httpSender.send, {
      router: '/api/shelf/get-shelves',
    });
    yield put({
      type: SHELVES_GET_SUCCESS,
      payload: { shelves },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: {
        error: e.response.data.message || e.message,
      },
    });
  }
}

export function* shelvesGetSaga() {
  yield takeLatest(SHELVES_GET, handle);
}
