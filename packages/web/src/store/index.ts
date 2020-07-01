import { combineReducers, createStore } from 'redux';
import { systemReducer } from './system/reducers';

const rootReducer = combineReducers({
  system: systemReducer,
});

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(rootReducer);

export default store;
