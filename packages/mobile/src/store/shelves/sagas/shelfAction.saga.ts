import { put, call, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
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

export function* shelfActionSaga() {
  yield takeLatest(SHELF_ACTION, handle);
}
