import { call, put, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { SHELVES_SHELF_EDIT, ShelvesShelfEdit } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelvesShelfEdit) {
  try {
    yield put({ type: INFORMATION_LOADER });

    yield call(httpSender.send, {
      router: '/api/shelf/edit-shelf',
      body: action.payload,
    });

    yield put({
      type: INFORMATION_NOTIFY,
      payload: { info: 'Shelf updated successfully' },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelvesShelfEditSaga() {
  yield takeLatest(SHELVES_SHELF_EDIT, handle);
}
