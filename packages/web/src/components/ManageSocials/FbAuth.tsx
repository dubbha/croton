import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth } from '../../store/auth/selectors';
import { appId, fields, scope, icon } from '../../constants/fb-login-props';

import { AuthButtonContainerProps } from './interfaces';

export const FbAuth = ({
  onResponseAction,
  onErrorAction,
  errorMessage,
  buttonText,
}: AuthButtonContainerProps) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getAuth);

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    const { accessToken } = response;
    const type = accessToken ? onResponseAction : onErrorAction;

    const payload = accessToken
      ? { accessToken }
      : { error: errorMessage };

    dispatch({
      type,
      payload,
    });
  };

  return (
    <FacebookLogin
      appId={appId}
      fields={fields}
      scope={scope}
      icon={icon}
      callback={responseFacebook}
      isDisabled={isLoading}
      size="small"
      textButton={buttonText}
      buttonStyle={{ width: '100%' }}
      containerStyle={{ width: '70%' }}
    />
  );
};
