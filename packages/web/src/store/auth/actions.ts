export interface AuthState {
  isLoading: boolean;
  token: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
  error: string | null;
}

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';

export const AUTH_REGISTER = 'AUTH_REGISTER';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export interface AuthLogin {
  type: typeof AUTH_LOGIN;
  payload: { email: string; password: string };
}

export interface AuthLoginSuccess {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: { id: number; name: string; email: string; token: string };
}

export interface AuthLoginError {
  type: typeof AUTH_LOGIN_ERROR;
  payload: { error: string };
}

export interface AuthRegister {
  type: typeof AUTH_REGISTER;
  payload: {
    email: string,
    password: string,
    firstName: string,
    lastName: string
  };
}

export interface AuthRegisterSuccess {
  type: typeof AUTH_REGISTER_SUCCESS;
  payload: { id: number; name: string; email: string; token: string };
}

export interface AuthRegisterError {
  type: typeof AUTH_REGISTER_ERROR;
  payload: { error: string };
}

export interface AuthLogout { type: typeof AUTH_LOGOUT }

export type AuthActionTypes =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginError
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterError
  | AuthLogout;
