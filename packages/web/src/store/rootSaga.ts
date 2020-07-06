import { all } from 'redux-saga/effects';
import { authLoginSaga, authRegisterSaga } from './auth/sagas';

export function* rootSaga() {
  yield all([
    authLoginSaga(),
    authRegisterSaga(),
  ])
}
