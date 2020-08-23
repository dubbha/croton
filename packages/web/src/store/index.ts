import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth';
import { shelfReducer } from './shelf';
import { rootSaga } from './rootSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['isLoading', 'info', 'error'],
};

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    auth: persistReducer(authPersistConfig, authReducer),
    shelf: shelfReducer,
  }),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware),
  ),
);

export default store;

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
