import { call, put, takeLatest } from 'redux-saga/effects';
import {
  http,
  notificationListener,
  notificationPermissionRequest
} from 'services';
import {
  NOTIFICATION_REGISTER,
  NOTIFICATION_REGISTER_SUCCESS,
  NOTIFICATION_REGISTER_ERROR
} from '../actions';

function* handle() {
  const registrationToken = yield call(notificationPermissionRequest);

  try {
    yield call(http.post, '/notification/register', { registrationToken });
    yield put({
      type: NOTIFICATION_REGISTER_SUCCESS
    });
    yield call(notificationListener);
  } catch (e) {
    yield put({
      type: NOTIFICATION_REGISTER_ERROR,
      payload: { error: e.response.data.message || e.message }
    });
  }
}

export function* notificationRegisterSaga() {
  yield takeLatest(NOTIFICATION_REGISTER, handle);
}
