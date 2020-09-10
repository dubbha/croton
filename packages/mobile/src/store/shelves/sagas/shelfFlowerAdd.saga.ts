import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { SHELF_FLOWER_ADD, ShelfFlowerAdd } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerAdd) {
  try {
    const successResult = true;
    const { name, description, rrules, shelfId } = action.payload;
    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/shelf/add-flower',
      body: { name, description, rrules, shelfId },
    });
    if (result.status === successResult) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: 'Flower added successfully' },
      });
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
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

export function* shelfFlowerAddSaga() {
  yield takeLatest(SHELF_FLOWER_ADD, handle);
}
