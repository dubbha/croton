import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import {
  SHELF_FLOWER_EDIT,
  SHELF_FLOWERS_GET,
  ShelfFlowerEdit,
} from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerEdit) {
  try {
    const successStatus = true;
    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/shelf/edit-flower',
      body: action.payload,
    });

    if (result.status !== successStatus) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
      });
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: 'Flower updated successfully' },
      });
      yield put({
        type: SHELF_FLOWERS_GET,
        payload: { shelfId: action.payload.shelfId },
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

export function* shelfFlowerEditSaga() {
  yield takeLatest(SHELF_FLOWER_EDIT, handle);
}
