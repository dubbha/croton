import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { http, Config } from 'services';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AuthLogin,
  AUTH_LOGIN_SUCCESS,
} from '../actions';

function* handle(action: AuthLogin) {
  const { email, password } = action.payload;
  try {
    const result = yield call(
      http.post,
      '/auth/login',
      { email, password },
      { preventUnauthorizedInterceptor: true } as Config,
    );
    const { data: { token, ...userData } } = result;
    yield call([localStorage, localStorage.setItem], 'authToken', token);
    yield put({
      type: AUTH_LOGIN_SUCCESS,
      payload: userData,
    });
    yield put(push('/profile'));
  } catch (e) {
    yield put({
      type: AUTH_LOGIN_ERROR,
      payload: { error: e.response.data.message },
    });
  }
}

export function* authLoginSaga() {
  yield takeLatest(AUTH_LOGIN, handle);
}
