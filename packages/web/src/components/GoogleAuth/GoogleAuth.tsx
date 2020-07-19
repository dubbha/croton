import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';

import { AUTH_GOOGLE, AUTH_GOOGLE_ERROR } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';
import { clientId, cookiePolicy } from '../../constants/google-login-props';

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getAuth);

  const responseGoogle = (response: any) => {
    console.log(response);
    const { accessToken } = response;
    const type = accessToken ? AUTH_GOOGLE : AUTH_GOOGLE_ERROR;

    const payload = accessToken
      ? { accessToken }
      : {
          error: 'Sorry, something went wrong with logging you in via Google'
        };

    dispatch({
      type,
      payload
    });
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      disabled={isLoading}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={cookiePolicy}
      className="google-auth"
    />
  );
};
