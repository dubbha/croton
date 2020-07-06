const root = '/api';
const auth = '/auth';
const authLogin = `${auth}/login`;
const authLoginFacebook = '/facebook';
const authLoginGoogle = '/google';
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
  authLoginGoogle,
  authConfirm,
  authPasswordReset,
  authPasswordUpdate,
};

export type Api = typeof api;
