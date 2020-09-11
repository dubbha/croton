import React from 'react';
import { useDispatch } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AUTH_CONFIRM_EMAIL } from '../../../store/auth/actions';

export const VerificationBackButton = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const gotToMainScreen = () => {
    navigation.popToTop();
    dispatch({
      type: AUTH_CONFIRM_EMAIL,
      payload: {
        isEmailVerification: false,
      },
    });
  };

  return <HeaderBackButton onPress={() => gotToMainScreen()} />;
};
