import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';

import {
  SCREEN_AUTHORIZATION,
  SCREEN_EMAIL_VERIFICATION,
  SCREEN_SIGN_IN,
  SCREEN_SIGN_UP,
  SCREEN_USER,
  SCREEN_USER_SETTINGS,
  SCREEN_USER_SHELVES,
  SCREEN_USER_FLOWERS,
  SCREEN_USER_SHELF,
  SCREEN_USER_FLOWER,
} from '../screens';
import { Authorization } from '../ScreensAuthorization/Authorization';
import { SignIn } from '../ScreensAuthorization/SignIn';
import { SignUp } from '../ScreensAuthorization/SignUp';
import { User } from '../UserScreens/User';
import { LogoutButton } from '../../components/LogoutButton';
import {
  VerificationBackButton,
  VerificationEmailWithCode,
} from '../ScreensAuthorization/VerificationEmailWithCode';
import { Settings } from '../UserScreens/Settings';
import { Shelves } from '../UserScreens/Shelves';
import { Shelf } from '../UserScreens/Shelf';
import { Flowers } from '../UserScreens/Flowers';
import { Flower } from '../UserScreens/Flower';
import { AUTH_TOKEN_SET } from '../../store/auth/actions';
import { INFORMATION_PUSHNOTIFICATION } from '../../store/information/actions';

export const Stack = createStackNavigator();

const renderScreensAuthorization = () => {
  return (
    <>
      <Stack.Screen
        name={SCREEN_AUTHORIZATION}
        component={Authorization}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_SIGN_IN}
        component={SignIn}
        options={{
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name={SCREEN_SIGN_UP}
        component={SignUp}
        options={{
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name={SCREEN_EMAIL_VERIFICATION}
        component={VerificationEmailWithCode}
        options={{
          headerLeft: () => <VerificationBackButton />,
        }}
      />
    </>
  );
};

const renderScreensUser = () => {
  return (
    <>
      <Stack.Screen
        name={SCREEN_USER}
        component={User}
        options={{
          headerRight: () => <LogoutButton />,
        }}
      />
      <Stack.Screen name={SCREEN_USER_SETTINGS} component={Settings} />
      <Stack.Screen name={SCREEN_USER_SHELVES} component={Shelves} />
      <Stack.Screen
        name={SCREEN_USER_SHELF}
        component={Shelf}
        options={({ route }) => {
          let title = route.params ? route.params.name : route.name;
          return { title };
        }}
      />
      <Stack.Screen name={SCREEN_USER_FLOWERS} component={Flowers} />
      <Stack.Screen
        name={SCREEN_USER_FLOWER}
        component={Flower}
        options={({ route }) => {
          let title = route.params ? route.params.name : route.name;
          return { title };
        }}
      />
    </>
  );
};

type MainScreenStateProps = {
  isAuthenticated?: boolean;
};

export const MainScreen = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { isAuthenticated } = auth;

  useEffect(() => {
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
    PushNotification.configure({
      onRegister: function({ token }) {
        console.log(token);
        dispatch({
          type: AUTH_TOKEN_SET,
          payload: {
            mobileToken: token,
          },
        });
      },

      onNotification: function(notification: any) {
        console.log(notification);
        dispatch({
          type: INFORMATION_PUSHNOTIFICATION,
          payload: notification,
        });
      },
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? renderScreensUser() : renderScreensAuthorization()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
