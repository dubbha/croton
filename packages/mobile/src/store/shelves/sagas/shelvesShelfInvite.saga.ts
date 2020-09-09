import { call, put, takeLatest, delay } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
  INFORMATION_HIDE,
} from '../../information/actions';
import { SHELVES_SHELF_INVITE, ShelvesShelfInvite } from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: ShelvesShelfInvite) {
  try {
    const { userEmail, shelfId } = action.payload;

    yield put({ type: INFORMATION_LOADER });

    yield call(httpSender.send, {
      router: '/api/shelf/user-invite',
      body: { userEmail, shelfId },
    });

    yield put({
      type: INFORMATION_NOTIFY,
      payload: { info: 'Invitation sent successfully' },
    });
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

export function* shelvesShelfInviteSaga() {
  yield takeLatest(SHELVES_SHELF_INVITE, handle);
}
