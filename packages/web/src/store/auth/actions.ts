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

export type SystemActionTypes = AuthLogin | AuthLoginSuccess | AuthLoginError;
