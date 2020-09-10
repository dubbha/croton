import {
  AUTH_LOGOUT,
  AUTH_LOGIN_SUCCESS,
  AUTH_PROFILE_UPDATE_INFO,
  AUTH_PROFILE_UPDATE_EMAIL,
  AUTH_CONFIRM_EMAIL,
  AuthState,
  AuthActionTypes,
  AUTH_TOKEN_SET,
} from './actions';

export const initialState: AuthState = {
  isAuthenticated: false,
  id: null,
  token: null,
  mobileToken: null,
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
      };
    }

    case AUTH_CONFIRM_EMAIL: {
      const { isEmailVerification } = action.payload;
      return {
        ...state,
        isEmailVerification,
      };
    }

    // TODO: After logout we should clean shelves store too
    case AUTH_LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        token: null,
        email: null,
        firstName: null,
        lastName: null,
        isEmailVerification: false,
      };
    }

    // TODO: this is doesn't work
    case AUTH_PROFILE_UPDATE_INFO: {
      const data = action.payload;
      return {
        ...state,
        ...data,
      };
    }

    case AUTH_PROFILE_UPDATE_EMAIL: {
      return {
        ...state,
      };
    }

    case AUTH_TOKEN_SET: {
      const { mobileToken } = action.payload;
      return {
        ...state,
        mobileToken,
      };
    }

    default: {
      return state;
    }
  }
}
