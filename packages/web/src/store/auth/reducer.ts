import {
  AuthState,
  SystemActionTypes,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR
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
  action: SystemActionTypes
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
        isLoading: false
      };
    }
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
