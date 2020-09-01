import { call, put, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { SHELF_FLOWER_ADD, ShelfFlowerAdd } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerAdd) {
  try {
    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/shelf/add-flower',
      body: action.payload,
    });

    console.dir(result);
    if (result.status === 403) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
      });
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: 'Flower added successfully' },
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

export function* shelfFlowerAddSaga() {
  yield takeLatest(SHELF_FLOWER_ADD, handle);
}
