import { all } from 'redux-saga/effects';
import { authSaga, registerSaga } from './system/sagas';

export function* rootSaga() {
  yield all([
    authSaga(),
    registerSaga(),
  ])
}