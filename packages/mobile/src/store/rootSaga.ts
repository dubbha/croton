import {
  authLoginSaga,
  authRegisterSaga,
  authProfileUpdateSaga,
} from './auth/sagas';

import {
  shelvesGetSaga,
  shelvesShelfAddSaga,
  shelvesShelfEditSaga,
  shelvesShelfDeleteSaga,
  shelvesShelfInviteSaga,
  shelfFlowersGetSaga,
  shelfFlowerGetSaga,
  shelfFlowerAddSaga,
  shelfFlowerEditSaga,
  shelfFlowerDeleteSaga,
  shelfActionSaga,
} from './shelves/sagas';

import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    authLoginSaga(),
    authRegisterSaga(),
    authProfileUpdateSaga(),
    shelvesGetSaga(),
    shelvesShelfAddSaga(),
    shelvesShelfEditSaga(),
    shelvesShelfDeleteSaga(),
    shelvesShelfInviteSaga(),
    shelfFlowersGetSaga(),
    shelfFlowerGetSaga(),
    shelfFlowerAddSaga(),
    shelfFlowerEditSaga(),
    shelfFlowerDeleteSaga(),
    shelfActionSaga(),
  ]);
}
