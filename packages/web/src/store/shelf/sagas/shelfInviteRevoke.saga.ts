import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_INVITE_REVOKE,
  SHELF_INVITE_REVOKE_SUCCESS,
  SHELF_INVITE_REVOKE_ERROR,
  ShelfInviteRevoke,
} from '../actions';

function* handle(action: ShelfInviteRevoke) {
  const { shelfId, inviteId } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/revoke-invite',
      { shelfId, inviteId },
    );
    yield put({
      type: SHELF_INVITE_REVOKE_SUCCESS,
      payload: { info: 'Invitation revoked successfully' },
    });
  } catch (e) {
    yield put({
      type: SHELF_INVITE_REVOKE_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfInviteRevokeSaga() {
  yield takeLatest(SHELF_INVITE_REVOKE, handle);
}
