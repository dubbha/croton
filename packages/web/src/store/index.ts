import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  RouterState,
  connectRouter,
  routerMiddleware
} from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { AuthState, authReducer } from './auth';
import { rootSaga } from './rootSaga';

export interface AppState {
  router: RouterState;
  auth: AuthState;
}

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    auth: authReducer
  }),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
);

export default store;

sagaMiddleware.run(rootSaga);
