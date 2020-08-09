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
  authEmailResetSaga,
  authEmailUpdateSaga
} from './auth/sagas';
import {
  shelfInviteSaga,
  shelfInviteAcceptSaga,
  shelfDeleteUserSaga,
} from './shelf/sagas';

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
    authEmailResetSaga(),
    authEmailUpdateSaga(),
    shelfInviteSaga(),
    shelfInviteAcceptSaga(),
    shelfDeleteUserSaga(),
  ]);
}
