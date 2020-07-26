import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './rootSaga';
import { authReducer } from './auth/reducers';

const sagaMiddleware = createSagaMiddleware();

export interface InterfaceStoreAuth {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  error: string;
  info: string;
}
export interface InterfaceStore {
  auth: InterfaceStoreAuth;
}

const store = createStore(
  combineReducers({
    auth: authReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

export default store;

sagaMiddleware.run(rootSaga);
