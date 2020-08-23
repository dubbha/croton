import { call, put, takeLatest } from 'redux-saga/effects';

import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
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
  } catch (e) {
    console.error(e);
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelvesShelfInviteSaga() {
  yield takeLatest(SHELVES_SHELF_INVITE, handle);
}