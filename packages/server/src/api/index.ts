const root = '/api';
const auth = '/auth';
const authLogin = `${auth}/login`;
const authLoginFacebook = `${auth}/facebook`;
const authLoginFacebookCallback = `${authLoginFacebook}/callback`;
const authLoginGoogle = `${auth}/google`;
const authLoginGoogleCallback = `${authLoginGoogle}/callback`;
const authRegister = `${auth}/register`;
const authConfirm = `${auth}/confirm`;
const authPasswordReset = `${auth}/password-reset`;
const authPasswordUpdate = `${auth}/password-update`;
const healthCheck = '/health-check';

export const api = {
  root,
  auth,
  authLogin,
  authRegister,
  healthCheck,
  authLoginFacebook,
  authLoginFacebookCallback,
  authLoginGoogle,
  authLoginGoogleCallback,
  authConfirm,
  authPasswordReset,
  authPasswordUpdate,
};

export type Api = typeof api;
