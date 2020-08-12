import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_INVITE_ACCEPT,
  SHELF_INVITE_ACCEPT_SUCCESS,
  SHELF_INVITE_ACCEPT_ERROR,
  ShelfInviteAccept
} from '../actions';

function* handle(action: ShelfInviteAccept) {
  const { shelfInvitationToken } = action.payload;

  if (!shelfInvitationToken) {
    yield put({
      type: SHELF_INVITE_ACCEPT_ERROR,
      payload: { error: 'Invalid invitation token' },
    });
    return;
  }

  try {
    yield call(
      http.post,
      '/shelf/user-invite-accept',
      { shelfInvitationToken }
    );
    yield put({
      type: SHELF_INVITE_ACCEPT_SUCCESS,
      payload: { info: 'Invitation accepted successfully' }
    });
  } catch (e) {
    yield put({
      type: SHELF_INVITE_ACCEPT_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* shelfInviteAcceptSaga() {
  yield takeLatest(SHELF_INVITE_ACCEPT, handle);
}
