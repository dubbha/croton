import React from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';

import { AUTH_GOOGLE, AUTH_GOOGLE_ERROR } from 'store/auth/actions';
import { getAuth } from 'store/auth/selectors';

import { clientId } from '../../constants/google-login-props';

import './styles.scss';

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getAuth);

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    dispatch({
      type: AUTH_GOOGLE,
      payload: { accessToken: (response as GoogleLoginResponse).accessToken },
    });
  };

  const responseGoogleFailure = () => {
    dispatch({
      type: AUTH_GOOGLE_ERROR,
      payload: {
        error: 'Sorry, something went wrong with logging you in via Google',
      },
    });
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      disabled={isLoading}
      className="google-auth-btn"
    />
  );
};
