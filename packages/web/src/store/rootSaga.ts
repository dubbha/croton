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
  authEmailUpdateSaga,
} from './auth/sagas';
import {
  shelfGetInvitesSaga,
  shelfInviteSaga,
  shelfInviteAcceptSaga,
  shelfInviteRevokeSaga,
  shelfDeleteUserSaga,
  shelfAddShelfSaga,
  shelfEditShelfSaga,
  shelfDeleteShelfSaga,
  shelfGetShelvesSaga,
  shelfAddFlowerSaga,
  shelfEditFlowerSaga,
  shelfDeleteFlowerSaga,
  shelfGetFlowersSaga,
  shelfGetFlowerSaga,
  shelfActionSaga,
  shelfGetLastActionsSaga,
  shelfGetActionsSaga,
  shelfGetUsersSaga,
  shelfMoveFlowerSaga,
} from './shelf/sagas';
import { notificationRegisterSaga } from './notification/sagas';

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
    shelfGetInvitesSaga(),
    shelfInviteSaga(),
    shelfInviteAcceptSaga(),
    shelfInviteRevokeSaga(),
    shelfDeleteUserSaga(),
    shelfAddShelfSaga(),
    shelfEditShelfSaga(),
    shelfDeleteShelfSaga(),
    shelfGetShelvesSaga(),
    shelfAddFlowerSaga(),
    shelfEditFlowerSaga(),
    shelfDeleteFlowerSaga(),
    shelfGetFlowersSaga(),
    shelfGetFlowerSaga(),
    shelfActionSaga(),
    shelfGetLastActionsSaga(),
    shelfGetActionsSaga(),
    notificationRegisterSaga(),
    shelfGetUsersSaga(),
    shelfMoveFlowerSaga(),
  ]);
}
