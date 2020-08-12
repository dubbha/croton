import {
  authLoginSaga,
  authRegisterSaga,
  authProfileUpdateSaga,
} from './auth/sagas';

import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([authLoginSaga(), authRegisterSaga(), authProfileUpdateSaga()]);
}
