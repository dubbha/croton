import { all } from 'redux-saga/effects';
import { authLoginSaga, registerSaga } from './auth/sagas';

export function* rootSaga() {
  yield all([
    authLoginSaga(),
    registerSaga(),
  ])
}
