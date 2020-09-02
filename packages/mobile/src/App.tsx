import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import PushNotification from 'react-native-push-notification';

import store from './store';
import { MainScreen } from './pages/Main';

PushNotification.configure({
  onRegister: function(token: any) {
    console.log('TOKEN:', token);
  },

  onNotification: function(notification: any) {
    console.log('NOTIFICATION:', notification);
  },
});

export const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};
