import { call, takeLatest, put } from 'redux-saga/effects';
import { http } from 'services';
import {
  AUTH_UPDATE_PROFILE,
  AUTH_UPDATE_PROFILE_SUCCESS,
  AUTH_UPDATE_PROFILE_ERROR,
  AuthUpdateProfile,
} from '../actions';

function* handle(action: AuthUpdateProfile) {
  const { firstName, lastName } = action.payload;

  try {
    yield call(http.post, '/management/user-update', {
      firstName,
      lastName,
    });
    yield put({
      type: AUTH_UPDATE_PROFILE_SUCCESS,
      payload: {
        info: 'Profile updated',
        firstName,
        lastName,
      },
    });
  } catch (e) {
    yield put({
      type: AUTH_UPDATE_PROFILE_ERROR,
      payload: { error: e.response.data.message },
    });
  }
}

export function* authUpdateProfileSaga() {
  yield takeLatest(AUTH_UPDATE_PROFILE, handle);
}
