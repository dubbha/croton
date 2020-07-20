import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import {
  AuthState,
  AuthActionTypes,
  AUTH_EMAIL_CONFIRM,
  AUTH_EMAIL_CONFIRM_ERROR,
  AUTH_EMAIL_CONFIRM_SUCCESS,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_LOGOUT,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_ERROR,
  AUTH_UPDATE_PASSWORD,
  AUTH_UPDATE_PASSWORD_SUCCESS,
  AUTH_UPDATE_PASSWORD_ERROR,
  AUTH_FACEBOOK,
  AUTH_FACEBOOK_SUCCESS,
  AUTH_FACEBOOK_ERROR,
  AUTH_UPDATE_PROFILE,
  AUTH_UPDATE_PROFILE_SUCCESS,
  AUTH_UPDATE_PROFILE_ERROR,
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
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes | LocationChangeAction
): AuthState {
  switch (action.type) {
    case AUTH_UPDATE_PASSWORD:
    case AUTH_RESET_PASSWORD:
    case AUTH_FACEBOOK:
    case AUTH_REGISTER:
    case AUTH_LOGIN:
    case AUTH_UPDATE_PROFILE:
      return {
        ...state,
        isLoading: true,
        error: null,
        info: null,
      };
    case AUTH_EMAIL_CONFIRM_SUCCESS:
    case AUTH_FACEBOOK_SUCCESS:
    case AUTH_LOGIN_SUCCESS: {
      const { id, firstName, lastName, email } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        id,
        firstName,
        lastName,
        email,
        isLoading: false,
      };
    }
    case AUTH_EMAIL_CONFIRM_ERROR:
    case AUTH_REGISTER_ERROR:
    case AUTH_LOGIN_ERROR:
    case AUTH_FACEBOOK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    case AUTH_UPDATE_PASSWORD_SUCCESS:
    case AUTH_RESET_PASSWORD_SUCCESS:
    case AUTH_REGISTER_SUCCESS:
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
