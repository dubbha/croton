import { takeLatest, call, put } from 'redux-saga/effects';

import {
  AUTH_PROFILE_UPDATE,
  AUTH_PROFILE_UPDATE_INFO,
  AuthProfileUpdate,
} from '../actions';
import {
  INFORMATION_NOTIFY,
  INFORMATION_LOADER,
} from '../../information/actions';
import { httpSender } from '../../../services/http/http.service';

function* handle(action: AuthProfileUpdate) {
  try {
    yield put({ type: INFORMATION_LOADER });

    const { id, firstName, lastName } = action.payload;
    const resultUpdateProfileInfo = yield call(httpSender.send, {
      router: '/api/management/user-update',
      body: { id, firstName, lastName },
    });
    // TODO: now it not available, fix this in future
    // const resultUpdateProfileEmail = yield call(httpSender.send, {
    //   router: '/api/management/email-update',
    //   body: { email },
    // });

    // TODO: check that we get correct data
    if (resultUpdateProfileInfo) {
      const message = 'You data has been successfully changed';
      // TODO: Check this action
      yield put({
        type: AUTH_PROFILE_UPDATE_INFO,
        payload: resultUpdateProfileInfo,
      });
      yield put({
        type: INFORMATION_NOTIFY,
        payload: {
          info: message,
        },
      });
    } else {
      const message = 'Something wen wrong, pls try again later';
      yield put({
        type: INFORMATION_NOTIFY,
        payload: {
          error: message,
        },
      });
    }
  } catch (e) {
    yield put({
      type: INFORMATION_NOTIFY,
      payload: { error: e.data.message },
    });
  }
}

export function* authProfileUpdateSaga() {
  yield takeLatest(AUTH_PROFILE_UPDATE, handle);
}
