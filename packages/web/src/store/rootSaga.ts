import { all } from 'redux-saga/effects';
// import { authSaga, registerSaga } from './system/sagas';
import { authLoginSaga } from './auth/sagas';

export function* rootSaga() {
  yield all([
    authLoginSaga(),
    // registerSaga(),
  ])
}

// export function* rootSaga() {
//   yield all([authLoginSaga()]);
// }
