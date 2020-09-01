import { call, put, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { SHELF_FLOWER_DELETE, ShelfFlowerDelete } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelfFlowerDelete) {
  try {
    const { id, shelfId } = action.payload;

    yield put({ type: INFORMATION_LOADER });

    yield call(httpSender.send, {
      router: '/api/shelf/delete-flower',
      body: { id, shelfId },
    });

    yield put({
      type: INFORMATION_NOTIFY,
      payload: { info: 'Flower delete successfully' },
    });

    // TODO: make additonal action like below
    // yield put(push(`/profile/shelf/${shelfId}`));
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfFlowerDeleteSaga() {
  yield takeLatest(SHELF_FLOWER_DELETE, handle);
}
