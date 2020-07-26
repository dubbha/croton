import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native';
import { AUTH_LOGOUT } from './../../store/auth/actions';

export const LogoutButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      title="Logout"
      onPress={() => {
        dispatch({ type: AUTH_LOGOUT });
      }}
    />
  );
};
