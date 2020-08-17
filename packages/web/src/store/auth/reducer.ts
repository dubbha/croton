import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { AuthState } from './interfaces';
import {
  AUTH_EMAIL_CONFIRM,
  AUTH_EMAIL_CONFIRM_ERROR,
  AUTH_EMAIL_CONFIRM_SUCCESS,
  AUTH_FACEBOOK,
  AUTH_FACEBOOK_ERROR,
  AUTH_FACEBOOK_SUCCESS,
  ADD_FACEBOOK,
  ADD_FACEBOOK_ERROR,
  ADD_FACEBOOK_SUCCESS,
  AUTH_GOOGLE,
  AUTH_GOOGLE_ERROR,
  AUTH_GOOGLE_SUCCESS,
  ADD_GOOGLE,
  ADD_GOOGLE_ERROR,
  ADD_GOOGLE_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_ERROR,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER,
  AUTH_REGISTER_ERROR,
  AUTH_REGISTER_SUCCESS,
  AUTH_RESET_EMAIL,
  AUTH_RESET_EMAIL_ERROR,
  AUTH_RESET_EMAIL_SUCCESS,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_ERROR,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_UPDATE_EMAIL,
  AUTH_UPDATE_EMAIL_ERROR,
  AUTH_UPDATE_EMAIL_SUCCESS,
  AUTH_UPDATE_PASSWORD,
  AUTH_UPDATE_PASSWORD_ERROR,
  AUTH_UPDATE_PASSWORD_SUCCESS,
  AUTH_UPDATE_PROFILE,
  AUTH_UPDATE_PROFILE_ERROR,
  AUTH_UPDATE_PROFILE_SUCCESS,
  AuthActionTypes,
} from './actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  isLoading: false,
  error: null,
  info: null,
  socialProfile: null,
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes | LocationChangeAction
): AuthState {
  switch (action.type) {
    case AUTH_UPDATE_PASSWORD:
    case AUTH_RESET_PASSWORD:
    case AUTH_FACEBOOK:
    case ADD_FACEBOOK:
    case AUTH_GOOGLE:
    case ADD_GOOGLE:
    case AUTH_REGISTER:
    case AUTH_LOGIN:
    case AUTH_UPDATE_PROFILE:
    case AUTH_RESET_EMAIL:
    case AUTH_UPDATE_EMAIL:
      return {
        ...state,
        isLoading: true,
        error: null,
        info: null,
      };
    case AUTH_EMAIL_CONFIRM_SUCCESS:
    case AUTH_LOGIN_SUCCESS:
    case AUTH_UPDATE_EMAIL_SUCCESS:
    case AUTH_FACEBOOK_SUCCESS:
    case AUTH_GOOGLE_SUCCESS: {
      const {
        id,
        firstName,
        lastName,
        email,
        socialProfile = initialState.socialProfile,
      } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        id,
        firstName,
        lastName,
        email,
        isLoading: false,
        socialProfile,
      };
    }
    case ADD_FACEBOOK_SUCCESS:
    case ADD_GOOGLE_SUCCESS: {
      const { socialProfile } = action.payload;
      return {
        ...state,
        isLoading: false,
        socialProfile,
      };
    }

    case AUTH_EMAIL_CONFIRM_ERROR:
    case AUTH_REGISTER_ERROR:
    case AUTH_LOGIN_ERROR:
    case AUTH_FACEBOOK_ERROR:
    case AUTH_GOOGLE_ERROR:
    case ADD_FACEBOOK_ERROR:
    case ADD_GOOGLE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case AUTH_UPDATE_PASSWORD_SUCCESS:
    case AUTH_RESET_PASSWORD_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
    case AUTH_RESET_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        info: action.payload.info,
      };

    case AUTH_UPDATE_PROFILE_SUCCESS: {
      const { firstName, lastName, info } = action.payload;
      return {
        ...state,
        isLoading: false,
        info,
        firstName,
        lastName,
      };
    }

    case AUTH_UPDATE_PASSWORD_ERROR:
    case AUTH_RESET_PASSWORD_ERROR:
    case AUTH_UPDATE_PROFILE_ERROR:
    case AUTH_RESET_EMAIL_ERROR:
    case AUTH_UPDATE_EMAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
        info: null,
      };

    case AUTH_EMAIL_CONFIRM:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_LOGOUT:
      return {
        ...initialState,
        isAuthenticated: false,
      };

    case LOCATION_CHANGE:
      return {
        ...state,
        isLoading: false,
        error: null,
        info: null,
      };
    default:
      return state;
  }
}
