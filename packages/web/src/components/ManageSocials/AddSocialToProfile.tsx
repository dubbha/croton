import React from 'react';
import { useSelector } from 'react-redux';

import {
  ADD_FACEBOOK,
  ADD_FACEBOOK_ERROR,
  ADD_GOOGLE,
  ADD_GOOGLE_ERROR,
} from '../../store/auth/actions';
import { getAuth } from '../../store/auth/selectors';

import { FbAuth } from './FbAuth';
import { GoogleAuth } from './GoogleAuth';

import {
  ADD_GOOGLE_ERROR_MESSAGE,
  ADD_GOOGLE_BUTTON_TEXT,
  ADD_FACEBOOK_BUTTON_TEXT,
  ADD_FACEBOOK_ERROR_MESSAGE,
} from './constants';

import './styles.scss';

export const AddSocialToProfile = () => {
  const auth = useSelector(getAuth);
  const { socialProfile } = auth;
  return socialProfile ? null : (
    <>
      <div className="authButtonContainer">
        <FbAuth
          onResponseAction={ADD_FACEBOOK}
          onErrorAction={ADD_FACEBOOK_ERROR}
          errorMessage={ADD_FACEBOOK_ERROR_MESSAGE}
          buttonText={ADD_FACEBOOK_BUTTON_TEXT}
        />
      </div>
      <div className="authButtonContainer">
        <GoogleAuth
          onResponseAction={ADD_GOOGLE}
          onErrorAction={ADD_GOOGLE_ERROR}
          errorMessage={ADD_GOOGLE_ERROR_MESSAGE}
          buttonText={ADD_GOOGLE_BUTTON_TEXT}
        />
      </div>
    </>
  );
};
