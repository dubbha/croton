export interface AuthState {
  isAuthenticated: boolean;
  id: number | null;
  token: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  error?: string | null;
  info?: string | null;
  isEmailVerification?: boolean;
}

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';

export const AUTH_REGISTER = 'AUTH_REGISTER';
export const AUTH_CONFIRM_EMAIL = 'AUTH_CONFIRM_EMAIL';

export const AUTH_PROFILE_UPDATE = 'AUTH_PROFILE_UPDATE';
export const AUTH_PROFILE_UPDATE_INFO = 'AUTH_PROFILE_UPDATE_INFO';
export const AUTH_PROFILE_UPDATE_EMAIL = 'AUTH_PROFILE_UPDATE_EMAIL';

export interface PayloadAuthLogin {
  email: string;
  password: string;
}
interface PayloadAuthSuccessLogin {
  id: number;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface PayloadAuthRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface PayloadAuthConfirmEmail {
  isEmailVerification: boolean;
}

export interface PayloadAuthProfileUpdate {
  id: string;
  token: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface PayloadAuthProfileUpdateInfo {
  firstName: string;
  lastName: string;
}

export interface PayloadAuthProfileEmail {
  email: string;
}

export interface AuthLogin {
  type: typeof AUTH_LOGIN;
  payload: PayloadAuthLogin;
}

export interface AuthLogout {
  type: typeof AUTH_LOGOUT;
}

export interface AuthLoginSuccess {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: PayloadAuthSuccessLogin;
}

export interface AuthRegister {
  type: typeof AUTH_REGISTER;
  payload: PayloadAuthRegister;
}

export interface AuthConfirmEmail {
  type: typeof AUTH_CONFIRM_EMAIL;
  payload: PayloadAuthConfirmEmail;
}

export interface AuthProfileUpdate {
  type: typeof AUTH_PROFILE_UPDATE;
  payload: PayloadAuthProfileUpdate;
}

export interface AuthProfileUpdateInfo {
  type: typeof AUTH_PROFILE_UPDATE_INFO;
  payload: PayloadAuthProfileUpdateInfo;
}

export interface AuthProfileUpdateEmail {
  type: typeof AUTH_PROFILE_UPDATE_EMAIL;
  payload: PayloadAuthProfileEmail;
}

export type AuthActionTypes =
  | AuthLogin
  | AuthLoginSuccess
  | AuthLogout
  | AuthRegister
  | AuthConfirmEmail
  | AuthProfileUpdateInfo
  | AuthProfileUpdateEmail;
