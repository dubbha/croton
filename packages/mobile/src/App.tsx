import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import store from './store';
import { MainScreen } from './pages/Main';

export const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};
