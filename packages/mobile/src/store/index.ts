import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './rootSaga';
import { informationReducer } from './information/reducers';
import { authReducer } from './auth/reducers';
import { shelvesReducer } from './shelves/reducers';

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
    shelves: shelvesReducer,
    information: informationReducer,
  }),
  applyMiddleware(sagaMiddleware),
);

export default store;

sagaMiddleware.run(rootSaga);
