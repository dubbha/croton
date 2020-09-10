import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { SHELF_FLOWER_DELETE, ShelfFlowerDelete } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerDelete) {
  try {
    const successStatus = true;
    const { flowerId: id, shelfId } = action.payload;

    yield put({ type: INFORMATION_LOADER });

    const result = yield call(httpSender.send, {
      router: '/api/shelf/delete-flower',
      body: { id, shelfId },
    });

    if (result.status === successStatus) {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { info: 'Flower delete successfully' },
      });
    } else {
      yield put({
        type: INFORMATION_NOTIFY,
        payload: { error: result.message },
      });
    }

    // TODO: make additonal action like below
    // yield put(push(`/profile/shelf/${shelfId}`));
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

export function* shelfFlowerDeleteSaga() {
  yield takeLatest(SHELF_FLOWER_DELETE, handle);
}
