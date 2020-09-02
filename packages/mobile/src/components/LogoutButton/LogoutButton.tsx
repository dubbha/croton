import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { AUTH_LOGOUT } from './../../store/auth/actions';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.logout}>
      <Text
        style={styles.logout__text}
        onPress={() => dispatch({ type: AUTH_LOGOUT })}>
        Logout
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logout: {
    paddingHorizontal: 10,
  },

  logout__text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
