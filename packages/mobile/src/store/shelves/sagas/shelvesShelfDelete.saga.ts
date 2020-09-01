import { call, put, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
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
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelvesShelfDeleteSaga() {
  yield takeLatest(SHELVES_SHELF_DELETE, handle);
}
