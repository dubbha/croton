import { call, put, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { SHELF_FLOWER_EDIT, ShelfFlowerEdit } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerEdit) {
  try {
    const differentResponse = true;
    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/shelf/edit-flower',
      body: action.payload,
    });

    if (result.status !== differentResponse) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
      });
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: 'Flower updated successfully' },
      });
    }
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfFlowerEditSaga() {
  yield takeLatest(SHELF_FLOWER_EDIT, handle);
}
