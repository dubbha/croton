import React from 'react';
import { useDispatch } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { AUTH_CONFIRM_EMAIL } from '../../../store/auth/actions';
import { INFORMATION_HIDE } from '../../../store/information/actions';

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
    dispatch({ type: INFORMATION_HIDE });
  };

  return <HeaderBackButton onPress={() => gotToMainScreen()} />;
};
