import { put, call, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { SHELF_ACTION } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle({ payload }: any) {
  try {
    const { action, flowerId, shelfId } = payload;
    yield put({ type: INFORMATION_LOADER });

    yield call(httpSender.send, {
      router: '/api/shelf/action',
      body: { action, flowerId, shelfId },
    });
    yield put({
      type: INFORMATION_NOTIFY,
      payload: {
        info: 'Action success',
      },
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

export function* shelfActionSaga() {
  yield takeLatest(SHELF_ACTION, handle);
}
