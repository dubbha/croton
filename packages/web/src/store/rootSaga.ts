import { all } from 'redux-saga/effects';
import {
  authLoginSaga,
  authLogoutSaga,
  authRegisterSaga,
  authResetPasswordSaga,
  authUpdatePasswordSaga,
  authEmailConfirmSaga,
  authFacebook,
  authGoogle,
  authUpdateProfileSaga,
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
    authGoogle(),
    authUpdateProfileSaga(),
  ]);
}
