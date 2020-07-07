export interface AuthState {
  isLoading: boolean;
  token: string | null;
  id: number | null;
  name: string | null;
  email: string | null;
  error: string | null;
  info: string | null;
}

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';

export const AUTH_REGISTER = 'AUTH_REGISTER';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_ERROR = 'AUTH_REGISTER_ERROR';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const AUTH_RESET_PASSWORD = 'AUTH_RESET_PASSWORD';
export const AUTH_RESET_PASSWORD_SUCCESS = 'AUTH_RESET_PASSWORD_SUCCESS';
export const AUTH_RESET_PASSWORD_ERROR = 'AUTH_RESET_PASSWORD_ERROR';

export const AUTH_UPDATE_PASSWORD = 'AUTH_UPDATE_PASSWORD';
export const AUTH_UPDATE_PASSWORD_SUCCESS = 'AUTH_UPDATE_PASSWORD_SUCCESS';
export const AUTH_UPDATE_PASSWORD_ERROR = 'AUTH_UPDATE_PASSWORD_ERROR';

export const AUTH_EMAIL_CONFIRM = 'AUTH_EMAIL_CONFIRM';
export const AUTH_EMAIL_CONFIRM_SUCCESS = 'AUTH_EMAIL_CONFIRM_SUCCESS';
export const AUTH_EMAIL_CONFIRM_ERROR = 'AUTH_EMAIL_CONFIRM_ERROR';

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
    email: string;
    password: string;
    name: string;
  };
}

export interface AuthRegisterSuccess {
  type: typeof AUTH_REGISTER_SUCCESS;
}

export interface AuthRegisterError {
  type: typeof AUTH_REGISTER_ERROR;
  payload: { error: string };
}

export interface AuthEmailConfirm {
  type: typeof AUTH_EMAIL_CONFIRM;
  payload: { emailVerificationToken: string };
}

export interface AuthEmailConfirmSuccess {
  type: typeof AUTH_EMAIL_CONFIRM_SUCCESS;
  payload: { id: number; name: string; email: string; token: string };
}

export interface AuthEmailConfirmError {
  type: typeof AUTH_EMAIL_CONFIRM_ERROR;
  payload: { error: string };
}

export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}

export interface AuthResetPassword {
  type: typeof AUTH_RESET_PASSWORD;
  payload: { email: string };
}

export interface AuthResetPasswordSuccess {
  type: typeof AUTH_RESET_PASSWORD_SUCCESS;
  payload: { info: string };
}

export interface AuthResetPasswordError {
  type: typeof AUTH_RESET_PASSWORD_ERROR;
  payload: { error: string };
}

export interface AuthUpdatePassword {
  type: typeof AUTH_UPDATE_PASSWORD;
  payload: { token: string; password: string };
}

export interface AuthUpdatePasswordSuccess {
  type: typeof AUTH_UPDATE_PASSWORD_SUCCESS;
  payload: { info: string };
}

export interface AuthUpdatePasswordError {
  type: typeof AUTH_UPDATE_PASSWORD_ERROR;
  payload: { error: string };
}

export type AuthActionTypes =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLoginError
  | AuthRegister
  | AuthRegisterSuccess
  | AuthRegisterError
  | AuthLogout
  | AuthResetPassword
  | AuthResetPasswordSuccess
  | AuthResetPasswordError
  | AuthUpdatePassword
  | AuthUpdatePasswordSuccess
  | AuthUpdatePasswordError
  | AuthEmailConfirm
  | AuthEmailConfirmSuccess
  |AuthEmailConfirmError;
