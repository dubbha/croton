import { takeLatest, call, put } from 'redux-saga/effects';

import {
  AUTH_NOTIFY,
  AUTH_PROFILE_UPDATE,
  AuthProfileUpdate,
  AUTH_PROFILE_UPDATE_INFO,
} from '../actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: AuthProfileUpdate) {
  try {
    const { id, token, firstName, lastName } = action.payload;
    const resultUpdateProfileInfo = yield call(httpSender.send, {
      router: '/api/management/user-update',
      body: { id, firstName, lastName },
      token,
    });
    // TODO: now it not available, fix this in future
    // const resultUpdateProfileEmail = yield call(httpSender.send, {
    //   router: '/api/management/email-update',
    //   body: { email },
    // });

    // TODO: check that we get correct data
    if (resultUpdateProfileInfo) {
      const message = 'You data has been successfully changed';
      yield put({
        type: AUTH_PROFILE_UPDATE_INFO,
        payload: resultUpdateProfileInfo,
      });
      yield put({
        type: AUTH_NOTIFY,
        payload: {
          info: message,
        },
      });
    } else {
      const message = 'Something wen wrong, pls try again later';
      yield put({
        type: AUTH_NOTIFY,
        payload: {
          error: message,
        },
      });
    }
  } catch (e) {
    yield put({
      type: AUTH_NOTIFY,
      payload: { error: e.data.message },
    });
  }
}

export function* authProfileUpdateSaga() {
  yield takeLatest(AUTH_PROFILE_UPDATE, handle);
}
