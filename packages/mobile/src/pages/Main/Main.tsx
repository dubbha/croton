import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { InterfaceStore } from '../../store';
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

const MainComponent = ({ isAuthenticated }: MainScreenStateProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? renderScreensUser() : renderScreensAuthorization()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: InterfaceStore) => {
  const auth = state.auth;
  return auth;
};

export const MainScreen = connect(
  mapStateToProps,
  null,
)(MainComponent);
