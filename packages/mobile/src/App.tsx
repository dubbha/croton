import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

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

// TODO: this is changes for test with real dev account
// should uncomment when get dev credentials
// PushNotificationIOS.requestPermissions(['alert', 'badge', 'sound']);

// PushNotificationIOS.addEventListener('register', function(data) {
//   console.log('PushNotificationIOS register');
//   console.dir(data);
// });

// PushNotificationIOS.addEventListener('notification', function(data) {
//   console.log('PushNotificationIOS notification');
//   console.dir(data);
// });

// PushNotificationIOS.addEventListener('registrationError', function(data) {
//   console.log('PushNotificationIOS registrationError');
//   console.dir(data);
// });

export const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};
