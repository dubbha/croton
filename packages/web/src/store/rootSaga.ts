import { all } from 'redux-saga/effects';
import {
  authLoginSaga,
  authLogoutSaga,
  authRegisterSaga,
  authResetPasswordSaga,
  authUpdatePasswordSaga,
  authEmailConfirmSaga,
  authFacebook,
  authGoogle
} from './auth/sagas';

export function* rootSaga() {
  yield all([
    authLoginSaga(),
    authLogoutSaga(),
    authRegisterSaga(),
    authResetPasswordSaga(),
    authUpdatePasswordSaga(),
    authEmailConfirmSaga(),
    authFacebook(),
    authGoogle()
  ]);
}
