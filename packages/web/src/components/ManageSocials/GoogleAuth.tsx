import React from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useSelector, useDispatch } from 'react-redux';

import { getAuth } from '../../store/auth/selectors';
import { clientId } from '../../constants/google-login-props';

import { AuthButtonContainerProps } from './interfaces';

import './styles.scss';

export const GoogleAuth = ({
  onResponseAction,
  onErrorAction,
  errorMessage,
  buttonText,
}: AuthButtonContainerProps) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getAuth);

  const responseGoogleSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    dispatch({
      type: onResponseAction,
      payload: { accessToken: (response as GoogleLoginResponse).accessToken },
    });
  };

  const responseGoogleFailure = () => {
    dispatch({
      type: onErrorAction,
      payload: {
        error: errorMessage,
      },
    });
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText={buttonText}
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleFailure}
      disabled={isLoading}
      className="google-auth-btn"
    />
  );
};
