import { all } from 'redux-saga/effects';
import {
  authLoginSaga,
  authRegisterSaga,
  authResetPasswordSaga,
  authUpdatePasswordSaga,
  authEmailConfirmSaga
} from './auth/sagas';

export function* rootSaga() {
  yield all([
    authLoginSaga(),
    authRegisterSaga(),
    authResetPasswordSaga(),
    authUpdatePasswordSaga(),
    authEmailConfirmSaga()
  ])
}
