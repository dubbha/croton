import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { SHELVES_SHELF_ADD, ShelvesShelfAdd } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelvesShelfAdd) {
  try {
    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/shelf/add-shelf',
      body: action.payload,
    });

    if (result.status) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: 'Shelf added successfully' },
      });
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: 'Error. Pls try again later' },
      });
    }
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message || e.message },
    });
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  }
}

export function* shelvesShelfAddSaga() {
  yield takeLatest(SHELVES_SHELF_ADD, handle);
}
