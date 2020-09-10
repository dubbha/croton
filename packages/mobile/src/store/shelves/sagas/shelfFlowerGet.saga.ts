import { put, call, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import {
  SHELF_FLOWER_GET,
  SHELF_FLOWER_GET_SUCCESS,
  ShelfFlowerGet,
} from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerGet) {
  try {
    const { id } = action.payload;
    yield put({ type: INFORMATION_LOADER });

    const flower = yield call(httpSender.send, {
      router: '/api/shelf/get-flower',
      body: { id },
    });

    yield put({
      type: SHELF_FLOWER_GET_SUCCESS,
      payload: { flower },
    });
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: {
        error: e.response.data.message || e.message,
      },
    });
    yield delay(1000);
    yield put({
      type: INFORMATION_HIDE,
    });
  }
}

export function* shelfFlowerGetSaga() {
  yield takeLatest(SHELF_FLOWER_GET, handle);
}
