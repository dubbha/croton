import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { SHELVES_SHELF_DELETE, ShelvesShelfDelete } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelvesShelfDelete) {
  try {
    yield put({ type: INFORMATION_LOADER });

    yield call(httpSender.send, {
      router: '/api/shelf/delete-shelf',
      body: action.payload,
    });

    yield put({
      type: INFORMATION_NOTIFY,
      payload: { info: 'Shelf deleted successfully' },
    });
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

export function* shelvesShelfDeleteSaga() {
  yield takeLatest(SHELVES_SHELF_DELETE, handle);
}
