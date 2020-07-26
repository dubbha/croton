import {
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
  AUTH_NOTIFY,
  AUTH_PROFILE_UPDATE_INFO,
  AUTH_PROFILE_UPDATE_EMAIL,
  AUTH_CONFIRM_EMAIL,
  AuthState,
  AuthActionTypes,
} from './actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  id: null,
  token: null,
  firstName: null,
  lastName: null,
  email: null,
};

export function authReducer(
  state = initialState,
  action: AuthActionTypes,
): AuthState {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS: {
      const { id, email, token, firstName, lastName } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        id,
        token,
        email,
        firstName,
        lastName,
        error: null,
        info: null,
      };
    }

    case AUTH_CONFIRM_EMAIL: {
      const { isEmailVerification } = action.payload;
      return {
        ...state,
        isEmailVerification,
      };
    }

    case AUTH_NOTIFY: {
      const { info = null, error = null } = action.payload;
      return {
        ...state,
        info,
        error,
      };
    }

    case AUTH_LOGOUT: {
      return {
        isAuthenticated: false,
        id: null,
        token: null,
        email: null,
        firstName: null,
        lastName: null,
        error: null,
        info: null,
        isEmailVerification: false,
      };
    }

    case AUTH_PROFILE_UPDATE_INFO: {
      const data = action.payload;
      return {
        ...state,
        data,
      };
    }

    case AUTH_PROFILE_UPDATE_EMAIL: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
}
