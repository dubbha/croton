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
  addFacebook,
  addGoogle,
  authUpdateProfileSaga,
  authEmailResetSaga,
  authEmailUpdateSaga
} from './auth/sagas';
import {
  shelfInviteSaga,
  shelfInviteAcceptSaga,
  shelfDeleteUserSaga,
  shelfAddShelfSaga,
  shelfEditShelfSaga,
  shelfDeleteShelfSaga,
  shelfGetShelvesSaga,
  shelfAddFlowerSaga,
  shelfEditFlowerSaga,
  shelfDeleteFlowerSaga,
  shelfGetFlowersSaga,
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
    addFacebook(),
    addGoogle(),
    authUpdateProfileSaga(),
    authEmailResetSaga(),
    authEmailUpdateSaga(),
    shelfInviteSaga(),
    shelfInviteAcceptSaga(),
    shelfDeleteUserSaga(),
    shelfAddShelfSaga(),
    shelfEditShelfSaga(),
    shelfDeleteShelfSaga(),
    shelfGetShelvesSaga(),
    shelfAddFlowerSaga(),
    shelfEditFlowerSaga(),
    shelfDeleteFlowerSaga(),
    shelfGetFlowersSaga(),
  ]);
}
