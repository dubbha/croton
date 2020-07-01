import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { systemReducer } from './system/reducer';
import { rootSaga } from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  system: systemReducer,
});

const store = createStore(
  rootReducer,
  {},
  applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(rootSaga)