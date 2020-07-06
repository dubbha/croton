import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router'
import {
  AuthState,
  AuthActionTypes,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
  AUTH_LOGOUT
} from './actions';

export const initialState: AuthState = {
  token: null,
  id: null,
  name: null,
  email: null,
  isLoading: false,
  error: null
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes | LocationChangeAction
): AuthState {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AUTH_LOGIN_SUCCESS: {
      const { id, name, email, token } = action.payload;
      return {
        ...state,
        id,
        name,
        email,
        token,
        isLoading: false,
        error: null
      };
    }
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case AUTH_REGISTER:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null
      };
    }
    case AUTH_REGISTER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    case AUTH_LOGOUT:
      return {
        ...initialState,
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        isLoading: false,
        error: null,
      }
    default:
      return state;
  }
}
