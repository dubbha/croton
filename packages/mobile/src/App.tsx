import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Header } from './components/Header';

import { AutorizationScreen } from './pages/AutorizationScreen';
import { SignInScreen } from './pages/SignInScreen';
import { SignUpScreen } from './pages/SignUpScreen';

const Stack = createStackNavigator();

export function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Autorization screen"
            component={AutorizationScreen}
            options={{
              headerTitle: () => <Header />,
              headerShown: false,
            }}
          />
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
