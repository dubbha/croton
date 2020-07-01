import { all } from 'redux-saga/effects';
import { authSaga } from './system/sagas';

export function* rootSaga() {
  yield all([
    authSaga(),
  ])
}