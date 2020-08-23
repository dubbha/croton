import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_INVITE,
  SHELF_INVITE_SUCCESS,
  SHELF_INVITE_ERROR,
  ShelfInvite,
} from '../actions';

function* handle(action: ShelfInvite) {
  const { userEmail, shelfId } = action.payload;

  try {
    yield call(
      http.post,
      '/shelf/user-invite',
      { userEmail, shelfId },
    );
    yield put({
      type: SHELF_INVITE_SUCCESS,
      payload: { info: 'Invitation sent successfully' },
    });
  } catch (e) {
    yield put({
      type: SHELF_INVITE_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfInviteSaga() {
  yield takeLatest(SHELF_INVITE, handle);
}
