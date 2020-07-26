import React from 'react';
import { useDispatch } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AUTH_CONFIRM_EMAIL, AUTH_NOTIFY } from '../../../store/auth/actions';

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
    dispatch({
      type: AUTH_NOTIFY,
      payload: {
        info: null,
      },
    });
  };

  return <HeaderBackButton onPress={() => gotToMainScreen()} />;
};
