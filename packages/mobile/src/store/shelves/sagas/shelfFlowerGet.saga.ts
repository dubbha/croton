import { put, call, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import {
  SHELF_FLOWER_GET,
  SHELF_FLOWER_GET_SUCCESS,
  ShelfFlowerGet,
} from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerGet) {
  try {
    const { shelfId } = action.payload;
    yield put({ type: INFORMATION_LOADER });

    const flowers = yield call(httpSender.send, {
      router: '/api/shelf/get-flowers',
      body: { shelfId },
    });

    yield put({
      type: SHELF_FLOWER_GET_SUCCESS,
      payload: { flowers },
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

export function* shelfFlowerGetSaga() {
  yield takeLatest(SHELF_FLOWER_GET, handle);
}
