import { call, takeLatest, put } from 'redux-saga/effects';
import { http } from 'services';
import { push } from 'connected-react-router';
import {
  AUTH_UPDATE_EMAIL,
  AUTH_UPDATE_EMAIL_SUCCESS,
  AUTH_UPDATE_EMAIL_ERROR,
  AuthUpdateEmail,
} from '../actions';

function* handle(action: AuthUpdateEmail) {
  const { email, emailResetToken } = action.payload;

  if (!emailResetToken || !email) {
    yield put({
      type: AUTH_UPDATE_EMAIL_ERROR,
      payload: { error: 'Token parse error' },
    });

    return;
  }
  try {
    const result = yield call(http.post, '/management/email-update', {
      email,
      emailResetToken,
    });
    const {
      data: { token, ...userData },
    } = result;
    yield call([localStorage, localStorage.setItem], 'authToken', token);
    yield put({
      type: AUTH_UPDATE_EMAIL_SUCCESS,
      payload: userData,
    });
    yield put(push('/profile'));
  } catch (e) {
    yield put({
      type: AUTH_UPDATE_EMAIL_ERROR,
      payload: { error: e.response.data.message },
    });
  }
}

export function* authEmailUpdateSaga() {
  yield takeLatest(AUTH_UPDATE_EMAIL, handle);
}
