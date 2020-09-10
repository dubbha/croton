import { put, call, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import {
  SHELF_FLOWERS_GET,
  SHELF_FLOWERS_GET_SUCCESS,
  ShelfFlowersGet,
} from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowersGet) {
  try {
    const { shelfId } = action.payload;
    yield put({ type: INFORMATION_LOADER });

    const flowers = yield call(httpSender.send, {
      router: '/api/shelf/get-flowers',
      body: { shelfId },
    });

    yield put({
      type: SHELF_FLOWERS_GET_SUCCESS,
      payload: { flowers },
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

export function* shelfFlowersGetSaga() {
  yield takeLatest(SHELF_FLOWERS_GET, handle);
}
