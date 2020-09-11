import { call, put, takeLatest } from 'redux-saga/effects';
import { http } from 'services';
import {
  SHELF_GET_INVITES,
  SHELF_GET_INVITES_SUCCESS,
  SHELF_GET_INVITES_ERROR,
  ShelfGetInvites,
} from '../actions';

function* handle(action: ShelfGetInvites) {
  try {
    const { shelfId } = action.payload;
    const { data } = yield call(
      http.post,
      '/shelf/pending-invites',
      { shelfId },
    );
    yield put({
      type: SHELF_GET_INVITES_SUCCESS,
      payload: { invites: data },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SHELF_GET_INVITES_ERROR,
      payload: { error: e.response.data.message || e.message },
    });
  }
}

export function* shelfGetInvitesSaga() {
  yield takeLatest(SHELF_GET_INVITES, handle);
}
