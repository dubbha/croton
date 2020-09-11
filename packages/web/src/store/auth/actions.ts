import { SocialProfile, Invite } from './interfaces';

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

export const AUTH_FACEBOOK = 'AUTH_FACEBOOK';
export const AUTH_FACEBOOK_SUCCESS = 'AUTH_FACEBOOK_SUCCESS';
export const AUTH_FACEBOOK_ERROR = 'AUTH_FACEBOOK_ERROR';

export const ADD_FACEBOOK = 'ADD_FACEBOOK';
export const ADD_FACEBOOK_SUCCESS = 'ADD_FACEBOOK_SUCCESS';
export const ADD_FACEBOOK_ERROR = 'ADD_FACEBOOK_ERROR';

export const AUTH_GOOGLE = 'AUTH_GOOGLE';
export const AUTH_GOOGLE_SUCCESS = 'AUTH_GOOGLE_SUCCESS';
export const AUTH_GOOGLE_ERROR = 'AUTH_GOOGLE_ERROR';

export const ADD_GOOGLE = 'ADD_GOOGLE';
export const ADD_GOOGLE_SUCCESS = 'ADD_GOOGLE_SUCCESS';
export const ADD_GOOGLE_ERROR = 'ADD_GOOGLE_ERROR';

export const AUTH_UPDATE_PROFILE = 'AUTH_UPDATE_PROFILE';
export const AUTH_UPDATE_PROFILE_SUCCESS = 'AUTH_UPDATE_PROFILE_SUCCESS';
export const AUTH_UPDATE_PROFILE_ERROR = 'AUTH_UPDATE_PROFILE_ERROR';

export const AUTH_RESET_EMAIL = 'AUTH_RESET_EMAIL';
export const AUTH_RESET_EMAIL_SUCCESS = 'AUTH_RESET_EMAIL_SUCCESS';
export const AUTH_RESET_EMAIL_ERROR = 'AUTH_RESET_EMAIL_ERROR';

export const AUTH_UPDATE_EMAIL = 'AUTH_UPDATE_EMAIL';
export const AUTH_UPDATE_EMAIL_SUCCESS = 'AUTH_UPDATE_EMAIL_SUCCESS';
export const AUTH_UPDATE_EMAIL_ERROR = 'AUTH_UPDATE_EMAIL_ERROR';

export const AUTH_GET_INVITES = 'AUTH_GET_INVITES';
export const AUTH_GET_INVITES_SUCCESS = 'AUTH_GET_INVITES_SUCCESS';
export const AUTH_GET_INVITES_ERROR = 'AUTH_GET_INVITES_ERROR';

interface AuthLoginSuccessPayload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  socialProfile: SocialProfile | null;
}

interface AuthLoginWithSocialSuccessPayload extends AuthLoginSuccessPayload {
  socialProfile: SocialProfile;
}

export interface AuthLogin {
  type: typeof AUTH_LOGIN;
  payload: { email: string; password: string };
}

export interface AuthLoginSuccess {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: AuthLoginSuccessPayload;
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
    firstName: string;
    lastName: string;
  };
}

export interface AuthRegisterSuccess {
  type: typeof AUTH_REGISTER_SUCCESS;
  payload: { info: string };
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
  payload: AuthLoginSuccessPayload;
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

export interface AuthFacebook {
  type: typeof AUTH_FACEBOOK;
  payload: { accessToken: string };
}

export interface AuthFacebookSuccess {
  type: typeof AUTH_FACEBOOK_SUCCESS;
  payload: AuthLoginWithSocialSuccessPayload;
}

export interface AuthFacebookError {
  type: typeof AUTH_FACEBOOK_ERROR;
  payload: { error: string };
}

export interface AddFacebook {
  type: typeof ADD_FACEBOOK;
  payload: { accessToken: string };
}

export interface AddFacebookSuccess {
  type: typeof ADD_FACEBOOK_SUCCESS;
  payload: AuthLoginWithSocialSuccessPayload;
}

export interface AddFacebookError {
  type: typeof ADD_FACEBOOK_ERROR;
  payload: { error: string };
}

export interface AuthGoogle {
  type: typeof AUTH_GOOGLE;
  payload: { accessToken: string };
}

export interface AuthGoogleSuccess {
  type: typeof AUTH_GOOGLE_SUCCESS;
  payload: AuthLoginWithSocialSuccessPayload;
}

export interface AuthGoogleError {
  type: typeof AUTH_GOOGLE_ERROR;
  payload: { error: string };
}

export interface AddGoogle {
  type: typeof ADD_GOOGLE;
  payload: { accessToken: string };
}

export interface AddGoogleSuccess {
  type: typeof ADD_GOOGLE_SUCCESS;
  payload: AuthLoginWithSocialSuccessPayload;
}

export interface AddGoogleError {
  type: typeof ADD_GOOGLE_ERROR;
  payload: { error: string };
}

export interface AuthUpdateProfile {
  type: typeof AUTH_UPDATE_PROFILE;
  payload: { firstName: string; lastName: string };
}

export interface AuthUpdateProfileSuccess {
  type: typeof AUTH_UPDATE_PROFILE_SUCCESS;
  payload: { firstName: string; lastName: string; info: string };
}

export interface AuthUpdateProfileError {
  type: typeof AUTH_UPDATE_PROFILE_ERROR;
  payload: { error: string };
}

export interface AuthResetEmail {
  type: typeof AUTH_RESET_EMAIL;
}

export interface AuthResetEmailSuccess {
  type: typeof AUTH_RESET_EMAIL_SUCCESS;
  payload: { info: string };
}

export interface AuthResetEmailError {
  type: typeof AUTH_RESET_EMAIL_ERROR;
  payload: { error: string };
}

export interface AuthUpdateEmail {
  type: typeof AUTH_UPDATE_EMAIL;
  payload: { emailResetToken: string; email: string };
}

export interface AuthUpdateEmailSuccess {
  type: typeof AUTH_UPDATE_EMAIL_SUCCESS;
  payload: AuthLoginSuccessPayload;
}

export interface AuthUpdateEmailError {
  type: typeof AUTH_UPDATE_EMAIL_ERROR;
  payload: { error: string };
}

export interface AuthGetInvites {
  type: typeof AUTH_GET_INVITES;
}

export interface AuthGetInvitesSuccess {
  type: typeof AUTH_GET_INVITES_SUCCESS;
  payload: { invites: Invite[] };
}

export interface AuthGetInvitesError {
  type: typeof AUTH_GET_INVITES_ERROR;
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
  | AuthEmailConfirmError
  | AuthFacebook
  | AuthFacebookSuccess
  | AuthFacebookError
  | AddFacebook
  | AddFacebookSuccess
  | AddFacebookError
  | AuthGoogle
  | AuthGoogleSuccess
  | AuthGoogleError
  | AddGoogle
  | AddGoogleSuccess
  | AddGoogleError
  | AuthUpdateProfile
  | AuthUpdateProfileSuccess
  | AuthUpdateProfileError
  | AuthResetEmail
  | AuthResetEmailSuccess
  | AuthResetEmailError
  | AuthUpdateEmail
  | AuthUpdateEmailSuccess
  | AuthUpdateEmailError
  | AuthGetInvites
  | AuthGetInvitesSuccess
  | AuthGetInvitesError;
