import React from 'react';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { useDispatch, useSelector } from 'react-redux';

import { AUTH_FACEBOOK, AUTH_FACEBOOK_ERROR } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';
import { appId, fields, scope, icon } from '../../constants/fb-login-props';

export const FbAuth = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getAuth);

  const responseFacebook = (response: ReactFacebookLoginInfo) => {
    const { accessToken } = response;
    const type = accessToken ? AUTH_FACEBOOK : AUTH_FACEBOOK_ERROR;

    const payload = accessToken
      ? { accessToken }
      : {
          error: 'Sorry, something went wrong with logging you in via Facebook '
        };

    dispatch({
      type,
      payload
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
      buttonStyle={{ width: '100%' }}
      containerStyle={{ width: '70%' }}
    />
  );
};
