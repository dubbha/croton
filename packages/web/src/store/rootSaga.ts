import { all } from 'redux-saga/effects';
import { authLoginSaga } from './auth/sagas';

export function* rootSaga() {
  yield all([authLoginSaga()]);
}
