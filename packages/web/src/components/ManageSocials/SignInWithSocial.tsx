import React from 'react';

import {
  AUTH_FACEBOOK,
  AUTH_FACEBOOK_ERROR,
  AUTH_GOOGLE,
  AUTH_GOOGLE_ERROR,
} from '../../store/auth/actions';

import { FbAuth } from './FbAuth';
import { GoogleAuth } from './GoogleAuth';

import {
  SIGNIN_WITH_GOOGLE_ERROR_MESSAGE,
  GOOGLE_SIGNIN_BUTTON_TEXT,
  SIGNIN_WITH_FACEBOOK_ERROR_MESSAGE,
} from './constants';

import './styles.scss';

export const SignInWithSocial = () => (
  <>
    <div className="authButtonContainer">
      <FbAuth
        onResponseAction={AUTH_FACEBOOK}
        onErrorAction={AUTH_FACEBOOK_ERROR}
        errorMessage={SIGNIN_WITH_FACEBOOK_ERROR_MESSAGE}
      />
    </div>
    <div className="authButtonContainer">
      <GoogleAuth
        onResponseAction={AUTH_GOOGLE}
        onErrorAction={AUTH_GOOGLE_ERROR}
        errorMessage={SIGNIN_WITH_GOOGLE_ERROR_MESSAGE}
        buttonText={GOOGLE_SIGNIN_BUTTON_TEXT}
      />
    </div>
  </>
);
